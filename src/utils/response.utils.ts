// utils/express-functions.ts
/** biome-ignore-all lint/complexity/noStaticOnlyClass: <''> */
import type { Req, Res } from '@reflet/express';
import env from '@/config/env.ts';
import {
  EXPRESS_MESSAGES,
  EXPRESS_STATUS,
} from '@/helpers/constants/express.values.ts';
import { Logger } from '@/loaders/loki.client.ts';
import { totalUnhandledErrors } from '../helpers/functions/prometheus.functions.ts';

export class ResFN {
	// Utility to get client IP
	public static getIP(req: Req) {
		return req.headers['x-forwarded-for'] || req.socket.remoteAddress;
	}

	public static getOS(req: Req) {
		return req.headers['user-agent'];
	}

	// -------------------
	// Success Responses
	// -------------------
	public static success(
		res: Res,
		data: unknown,
		status: number = EXPRESS_STATUS.OK,
	) {
		return res.status(status).send({ code: 'success', ...data as any });
	}

	public static created(res: Res, data: unknown) {
		return res.status(EXPRESS_STATUS.CREATED).send(data);
	}

	public static successWithNoContent(res: Res) {
		return res.sendStatus(EXPRESS_STATUS.NO_CONTENT);
	}

	public static tempRedirect(res: Res, url: string) {
		return res.redirect(EXPRESS_STATUS.TEMPORARY_REDIRECT, url);
	}

	// -------------------
	// Client Error Responses
	// -------------------
	public static conflict(res: Res, data: unknown) {
		return res.status(EXPRESS_STATUS.CONFLICT).send(data);
	}

	public static badRequest(res: Res, data: unknown) {
		return res.status(EXPRESS_STATUS.BAD_REQUEST).send(data);
	}

	public static notFound(res: Res, data: unknown) {
		return res.status(EXPRESS_STATUS.NOT_FOUND).send(data);
	}

	public static forbidden(res: Res, data: unknown) {
		return res.status(EXPRESS_STATUS.FORBIDDEN).send({
			code: EXPRESS_STATUS.FORBIDDEN.toString().toLowerCase(),
			data,
		});
	}

	public static unauthorized(res: Res, data: unknown) {
		return res.status(EXPRESS_STATUS.UNAUTHORIZED).send({
			...data as any,
			message: EXPRESS_MESSAGES.UNAUTHORIZED,
		});
	}

	public static notAcceptable(res: Res, data?: unknown) {
		return res.status(EXPRESS_STATUS.NOT_ACCEPTABLE).send({
			message: EXPRESS_MESSAGES.NOT_ACCEPTABLE,
			...(data ? { ...data } : {}),
		});
	}

	// -------------------
	// Server Error Responses
	// -------------------
	public static internalServerError(res: Res, error: unknown) {
		if (env.ENV === 'production') {
			Logger.error({ error });
			totalUnhandledErrors.inc({ route: res.req.url });
		}
		return res.status(EXPRESS_STATUS.INTERNAL_SERVER_ERROR).send({
			message: EXPRESS_MESSAGES.INTERNAL_SERVER_ERROR,
			error,
		});
	}

	// -------------------
	// Flexible wrapper for custom HTTP status codes
	// -------------------
	public static custom(res: Res, data: unknown, status: number) {
		return res.status(status).send(data);
	}
}
