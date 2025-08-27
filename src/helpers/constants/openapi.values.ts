import { OpenApiRouteOptions, Parameter } from 'openapi-express-decorators';

export const AuthParam: Parameter = {
	name: 'Authorization',
	in: 'header',
	description: 'The Authorization header',
	required: true,
	schema: {
		type: 'string',
		example: 'Bearer <token>',
	},
};

export const openAPIUnimplementedError: OpenApiRouteOptions['responses'] = {
	500: {
		description: 'Unimplemented Failure',
		content: {
			'application/json': {
				example: {
					message: 'INTERNAL SERVER ERROR',
					code: 'error-code',
				},
			},
		},
	},
};
