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
import { registerMetrics } from './prom.client.ts';
import { setupSwagger } from './swagger.client.ts';

export default async function ({ app }: { app: Express }) {
	app.get('/status', (_, res) => res.sendStatus(200).end());
	app.head('/status', (_, res) => res.sendStatus(200).end());

	// Setting up OpenAPI & Swagger
	setupSwagger(app);

	// Register prometheus metrics
	if (env.ENV === 'production') registerMetrics();

	app.use(
		helmet({
			contentSecurityPolicy: false,
		}),
	);

	// RATE LIMITER (FROM SAME IP ADDRESS)
	app.use(
		'/auth',
		rateLimit({
			max: 12,
			windowMs: 60 * 60 * 1000,
			message: {
				status: 429,
				message:
					'We have received too many authentication requests, try again in 1hour',
			},
		}),
	);

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cors());
	app.use(morgan(env.MORGAN));

	// LATENCY COLLECTOR
	app.use(
		responseTime((req: Request, res: Response, time) => {
			if (req.url !== '/metrics' && env.ENV === 'production') {
				console.log(req.headers['user-agent']);
				totalReqCounter.inc();
				reqResTime
					.labels({
						method: req.method,
						route: req.url,
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
}
