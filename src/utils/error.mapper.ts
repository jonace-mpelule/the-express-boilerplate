// utils/error-mapper.ts

import type { Response } from 'express';
import Errors from '../helpers/constants/errors.ts';
import { AppError } from './app.errors.ts';
import { ResFN } from './response.utils.ts';

export function mapErrorToResponse(res: Response, error: unknown) {
	if (error instanceof AppError) {
		switch (error.code) {
			case Errors.UserNotFoundError:
				return ResFN.notFound(res, {
					code: error.code,
					message: Errors.UserNotFoundMessage,
				});

            case Errors.CountryNotFoundError: 
                return ResFN.notFound(res, {
                    code: error.code, 
                    message: Errors.CountryNotFoundMessage
                })

            case Errors.CredentialMismatchError: 
                return ResFN.conflict(res, {
                    code: error.code, 
                    message: error.message
                })

			default:
				return ResFN.internalServerError(res, error);
		}
	}

	// Fallback for unexpected error types
	return ResFN.internalServerError(res, error);
}
