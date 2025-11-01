// utils/controller-handler.ts
import type { Request, Response } from 'express';
import { mapErrorToResponse } from './error.mapper.ts';
import { ResFN } from './response.utils.ts';

/**
 * Generic controller wrapper.
 * Allows per-handler status codes and custom error handling.
 */
export function controllerHandler<T = any>(
	handler: (req: Request, res: Response) => Promise<T>,
	options?: {
		successStatus?: number; // Custom success HTTP status
		transform?: (data: T) => any; // Optional response data transformer
		onError?: (error: unknown, req: Request, res: Response) => any; // Custom error handler
	},
) {
	return async (req: Request, res: Response) => {
		try {
			const result = await handler(req, res);
			const transformed = options?.transform
				? options.transform(result)
				: result;

			// Custom success status (defaults to 200)
			const status = options?.successStatus ?? 200;
			return ResFN.success(res, transformed, status);
		} catch (error) {
			// Allow controller to define its own error logic
			if (options?.onError) {
				return options.onError(error, req, res);
			}

			// Fallback to global error mapper
			return mapErrorToResponse(res, error);
		}
	};
}
