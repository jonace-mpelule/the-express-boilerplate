import { Request, Response } from 'express';

import { AuthService } from './auth.service.ts';
import { ValidationGuard } from '../../../middleware/validation-guard.middleware.ts';
import { UserDTO } from '../../../types/user.dto.ts';
import { Get, Post, Router, Use } from '@reflet/express';
import { EXPRESS_FUNCTIONS } from '@/helpers/functions/express.functions.ts';
import { openAPIUnimplementedError } from '@/helpers/constants/openapi.values.ts';
import { OpenApiRoute } from 'openapi-express-decorators';

@Router('/v1/auth')
export class AuthController {
	private authService: AuthService;
	constructor() {
		this.authService = new AuthService();
	}

	@Post('/login')
	@Use(ValidationGuard(UserDTO))
	@OpenApiRoute('POST', '/v1/auth/login/', {
		summary: 'Login User',
		tags: ['User Auth'],
		parameters: [
			// AuthParam,
		],
		requestBody: {
			content: {
				'application/json': {
					example: {
						email: 'me@mail.com',
						password: 'password',
					},
				},
			},
		},
		responses: {
			200: {
				description: 'Login Successful',
				content: {
					'application/json': {
						example: {
							message: 'Login Successful',
							code: 'success',
							data: {
								id: 'd2855c90-f0c0-4d4c-aa6f-273a8ed1e51e',
								tokens: {
									accessToken: '',
									refreshToken: '',
								},
							},
						},
					},
				},
			},

			...openAPIUnimplementedError,
		},
	})
	async login(req: Request, res: Response) {
		try {
			var response = await this.authService.handleLogin(req.body);
			res.status(200).send({ ...response });
		} catch (err) {
			return EXPRESS_FUNCTIONS.unImplementedFailure(res, {});
		}
	}
}
