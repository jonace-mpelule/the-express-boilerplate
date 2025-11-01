import type { Next, Req, Res } from '@reflet/express';
import rateLimit from 'express-rate-limit';
import { EXPRESS_STATUS } from '@/helpers/constants/express.values.ts';
import { ResFN } from '@/utils/response.utils.ts';


type RateLimitProps = {
	maxRequests?: number;
	windowHours?: number;
	message?: string;
};

export function RateLimitGuard({
	maxRequests = 30,
	windowHours = 60,
	message = 'You have made too many requests. Please try again later',
}: RateLimitProps) {
	const limiter = rateLimit({
		max: maxRequests,
		windowMs: 60 * windowHours * 1000,
		message: {
			status: EXPRESS_STATUS.TOO_MANY_REQUESTS,
			message,
		},
	});

	return (req: Req, res: Res, next: Next) => {
		try {
			return limiter(req, res, next);
		} catch (err) {
			return ResFN.internalServerError(res, err);
		}
	};
}
