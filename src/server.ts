import express from 'express';
import 'reflect-metadata';
import env from '@/config/env.ts';
import { bLog } from './utils/better-logger.ts';

async function startServer() {
	const app = express();

	(await import('./loaders/index.ts')).default({ app });

	app
		.listen(env.PORT, () => {
			bLog('----------------------------------------');
			bLog(`SERVER RUNNING ON PORT ${env.PORT} 🚀`);
			bLog('----------------------------------------');
			bLog(`ENV: ${env.ENV.toUpperCase()}\n`.trim());
			bLog('----------------------------------------');
		})
		.on('error', (err: Error) => {
			console.log({ message: err.message });
			process.exit(1);
		});
}

startServer();
