import { createLogger } from 'winston';
import LokiTransport from 'winston-loki';

const lokiOptions = {
	// We use a single transport for the logger, which is a LokiTransport.
	transports: [
		// The LokiTransport is configured to send logs to the Loki server at
		// http://loki:3100, and to include a label for the app name.
		new LokiTransport({
			labels: { appName: 'express' },
			host: 'http://loki:3100',
		}),
	],
};

const Logger = createLogger(lokiOptions);
export { Logger };
