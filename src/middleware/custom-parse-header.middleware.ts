import { EXPRESS_FUNCTIONS } from '@/helpers/functions/express.functions.ts';

import { Next, Req, Res } from '@reflet/express';

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
			return EXPRESS_FUNCTIONS.unImplementedFailure(res, err);
		}
	};
}
