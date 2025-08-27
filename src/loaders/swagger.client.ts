import type { Req, Res } from '@reflet/express';
import type { Express } from 'express';
import basicAuth from 'express-basic-auth';
import yaml from 'js-yaml';
import {
    generateOpenApiDocs,
    type OpenApiDocsOptions,
} from 'openapi-express-decorators';
import swaggerUi from 'swagger-ui-express';
import env from '@/config/env.ts';
import { registeredRoutes } from '@/routes/index.ts';

const options: OpenApiDocsOptions = {
	openapi: '3.0.0',
	info: {
		title: 'My API Documentation',
		version: '1.0.0',
	},
	servers: [
		{
			url: `http://127.0.0.1:${env.PORT}`,
		},
		{
			url: '[ADD YOUR DEV SERVER]',
			description: 'Development Server',
		},
		{
			url: '[ADD YOUR PROD SERVER]',
			description: 'Production Server',
		},
	],
	paths: {},
	schemas: {},
	tags: [
		{
			name: 'User Auth',
			description: 'User related authentication endpoints',
		},
	],
};

// generate swagger spec
const swaggerSpec = generateOpenApiDocs(registeredRoutes, options);
export function setupSwagger(app: Express) {
	// Swagger UI
	app.use(
		'/docs',
		basicAuth({
			users: { admin: 'server-password' },
			challenge: true,
		}),
		swaggerUi.serve,
		swaggerUi.setup(swaggerSpec),
	);

	// Export OpenAPI Doc
	app.get('/openapi', (_: Req, res: Res) => {
		const yamlSpec = yaml.dump(swaggerSpec);
		res.setHeader('Content-Type', 'text/yaml');
		res.send(yamlSpec);
	});
}
