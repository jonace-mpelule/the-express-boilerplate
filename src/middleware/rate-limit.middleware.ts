import { EXPRESS_STATUS } from '@/helpers/constants/express.values.ts';
import { EXPRESS_FUNCTIONS } from '@/helpers/functions/express.functions.ts';
import { Next, Req, Res } from '@reflet/express';
import rateLimit from 'express-rate-limit';

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
			return EXPRESS_FUNCTIONS.unImplementedFailure(res, err);
		}
	};
}
