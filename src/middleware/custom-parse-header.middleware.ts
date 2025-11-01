import type { Next, Req, Res } from '@reflet/express';
import { ResFN } from '@/utils/response.utils.ts';

interface CustomRequest<T = any> extends Req {
	user?: any;
	parsed?: T;
}

export function CustomParseHeader(headers: Array<string>) {
	return (req: CustomRequest, res: Res, next: Next) => {
		try {
			const allHeaders: any = req.headers;
			const saved: any = {};
			for (const parsedHeaders of headers) {
				if (parsedHeaders in allHeaders) {
					saved[parsedHeaders] = allHeaders[parsedHeaders];
				}
			}
			req.parsed = saved;
			next();
		} catch (err) {
			return ResFN.internalServerError(res, err);
		}
	};
}
