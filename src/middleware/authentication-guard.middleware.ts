import { redisClient } from '@loaders/redis.client.ts';
import type { Req } from '@reflet/express';
import type { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '@/config/env.ts';
import { EXPRESS_STATUS } from '@/helpers/constants/express.values.ts';
import { EXPRESS_FUNCTIONS } from '@/helpers/functions/express.functions.ts';

interface CustomRequest<T = any> extends Req {
	user?: any;
	parsed?: T;
}

async function AuthGuard(
	req: CustomRequest,
	res: Response,
	next: NextFunction,
) {
	try {
		// Retrieve token from cookies or Authorization header
		let token: string | undefined;
		// Assigning token to a cookie accessToken if provided
		token = req.cookies?.accessToken ?? null;

		if (!token) {
			const authHeader = req.headers.authorization;

			if (authHeader?.startsWith('Bearer ')) {
				token = authHeader.split(' ')[1];
			}
		}

		if (!token) {
			return res
				.status(401)
				.json({ message: 'Access denied. No token provided.' });
		}

		// Check if the token is blacklisted
		const isBlacklisted = await redisClient.get(`blacklist_${token}`);
		if (isBlacklisted) {
			return res
				.status(401)
				.json({ message: 'Access Denied, Token Blacklisted' });
		}

		// Verify token validity
		jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, data: any) => {
			if (err) {
				return res
					.status(EXPRESS_STATUS.UNAUTHORIZED)
					.json({ message: 'Invalid or expired token' });
			}

			// Token is valid; proceed to the next middleware
			// the ID is because the payload of the token is { id: User["id"] }
			req.user = data.id;
			return next();
		});
	} catch (error) {
		// Catch any unexpected errors
		console.error('Error in token validation middleware:', error);
		return EXPRESS_FUNCTIONS.unImplementedFailure(res, error);
	}
}

export { AuthGuard };
