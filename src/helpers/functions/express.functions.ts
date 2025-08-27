import type { Req, Res } from '@reflet/express';
import env from '@/config/env.ts';
import {
	EXPRESS_MESSAGES,
	EXPRESS_STATUS,
} from '@/helpers/constants/express.values.ts';
import { Logger } from '@/loaders/loki.client.ts';
import { totalUnhandledErrors } from './prometheus.functions.ts';



export class EXPRESS_FUNCTIONS {
	public async getIP(req: Req) {
		return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	}

	public static async getOS(req: Req) {
		return req.headers['user-agent'];
	}

	public static async created(res: Res, data: unknown) {
		return res.status(EXPRESS_STATUS.CREATED).send({...{data}});
	}

	public static async success(res: Res, data: unknown) {
		return res.status(EXPRESS_STATUS.OK).send({
			code: 'success',
			...{data},
		});
	}

	public static async tempRedirect(res: Res, url: string) {
		return res.redirect(EXPRESS_STATUS.TEMPORARY_REDIRECT, url);
	}

	public static async successWithNoContent(res: Res) {
		return res.sendStatus(EXPRESS_STATUS.NO_CONTENT);
	}

	public static async conflictFailure(res: Res, data: unknown) {
		return res.status(EXPRESS_STATUS.CONFLICT).send({ ...{data} });
	}

	public static async badRequestFailure(res: Res, data: unknown) {
		return res.status(EXPRESS_STATUS.BAD_REQUEST).send({ ...{data} });
	}
	public static async notFoundFailure(res: Res, data: unknown) {
		return res.status(EXPRESS_STATUS.NOT_FOUND).send({ ...{data} });
	}

	public static async forbiddenFailure(res: Res, data: unknown) {
		console.log('data', data);
		return res.status(EXPRESS_STATUS.FORBIDDEN).send({
			code: EXPRESS_STATUS.FORBIDDEN.toString().toLowerCase(),
			...{data}
		});
	}

	public static async unauthorizedFailure(res: Res, data: unknown) {
		return res.status(EXPRESS_STATUS.UNAUTHORIZED).send({
			...{data},
			message: EXPRESS_MESSAGES.UNAUTHORIZED,
		});
	}

	public static async notAcceptableFailure(res: Res) {
		return res.status(EXPRESS_STATUS.NOT_ACCEPTABLE).send({
			message: EXPRESS_MESSAGES.NOT_ACCEPTABLE,
		});
	}

	public static async unImplementedFailure(res: Res, error: unknown) {
		if (env.ENV ==='production') {
			Logger.error({
				error,
			});
			totalUnhandledErrors.inc({
				route: res.req.url,
			});
		}
		return res.status(EXPRESS_STATUS.INTERNAL_SERVER_ERROR).send({
			message: EXPRESS_MESSAGES.INTERNAL_SERVER_ERROR,
			error: error,
		});
	}
}
