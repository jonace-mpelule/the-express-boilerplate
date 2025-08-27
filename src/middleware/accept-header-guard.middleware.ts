import { Next, Req, Res } from '@reflet/express';
import { EXPRESS_FUNCTIONS } from '@/helpers/functions/express.functions.ts';

type ContentTypes =
	| 'application/json'
	| 'text/plain'
	| 'text/html'
	| 'application/xml'
	| 'multipart/form-data'
	| 'application/x-www-form-urlencoded'
	| 'application/pdf'
	| 'image/jpeg'
	| 'image/png'
	| 'audio/mpeg'
	| 'video/mp4';

export function AcceptsHeaderGuard(allowedTypes: Array<ContentTypes>) {
	return (req: Req, res: Res, next: Next) => {
		try {
			const rawType = req.headers['content-type'];

			if (!rawType) {
				return EXPRESS_FUNCTIONS.notAcceptableFailure(res);
			}

			const [type] = rawType.split(';').map((s) => s.trim().toLowerCase());

			if (!allowedTypes.includes(type as ContentTypes)) {
				return EXPRESS_FUNCTIONS.notAcceptableFailure(res);
			}

			next();
		} catch (err) {
			return EXPRESS_FUNCTIONS.unImplementedFailure(res, err);
		}
	};
}
