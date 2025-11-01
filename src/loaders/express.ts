import cors from 'cors';
import express, { type Express, type Request, type Response } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import responseTime from 'response-time';
import env from '@/config/env.ts';
import {
	reqResTime,
	totalReqCounter,
} from '@/helpers/functions/prometheus.functions.ts';
import routes from '@/routes/index.ts';
import {
	globalErrorHandler,
	notFoundHandler,
} from '../middleware/errors.middleware.ts';
import { Logger } from './loki.client.ts';
import { registerMetrics } from './prom.client.ts';
import { setupSwagger } from './swagger.client.ts';

export default async function ({ app }: { app: Express }) {
	app.get('/status', (_, res) => res.sendStatus(200).end());
	app.head('/status', (_, res) => res.sendStatus(200).end());

	app.use(helmet({ contentSecurityPolicy: false }));
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(morgan(env.MORGAN));

	// Setting up OpenAPI & Swagger
	setupSwagger(app);

	// Register prometheus metrics
	if (env.ENV === 'production') registerMetrics();

	// GLOBAL RATE LIMITER
	app.use(
		rateLimit({
			max: 100,
			windowMs: 60 * 60 * 1000,
			standardHeaders: true,
			legacyHeaders: false,
			message: {
				status: 429,
				message: 'Too many auth requests, try again in 1 hour',
			},
		}),
	);

	// LATENCY COLLECTOR

	// LATENCY & PROMETHEUS
	app.use(
		responseTime((req: Request, res: Response, time: number) => {
			const skipMetrics = ['/metrics', '/swagger', '/favicon.ico'];
			if (!skipMetrics.includes(req.url) && env.ENV === 'production') {
				const routeLabel = req.url.replace(/\?.*$/, '');
				totalReqCounter.inc();
				reqResTime
					.labels({
						method: req.method,
						route: routeLabel,
						status_code: res.statusCode,
					})
					.observe(time);
			}
		}),
	);

	//REGISTER YOUR ROUTES HERE
	routes(app);

	// ERROR HANDLERS
	app.use(notFoundHandler);
	app.use(globalErrorHandler);

	// UNHANDLED EXCEPTIONS
	process.on('unhandledRejection', (reason) => Logger.error({ reason }));
	process.on('uncaughtException', (err) => Logger.error({ err }));
}
