import { bLog } from '@/utils/better-logger.ts';
import promClient from 'prom-client';

const registerMetrics = () => {
	const collectDefaultMetrics = promClient.collectDefaultMetrics;
	collectDefaultMetrics({ register: promClient.register });
	bLog('PROMETHEUS METRICS REGISTERED ✅');
};

export { registerMetrics };
