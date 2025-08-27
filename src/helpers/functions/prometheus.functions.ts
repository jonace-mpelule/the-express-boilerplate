import promClient from 'prom-client';

const reqResTime = new promClient.Histogram({
	name: 'http_express_req_res_time',
	help: 'Tells how time is taken by request to response',
	labelNames: ['method', 'route', 'status_code'],
	buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000, 5000],
});

const totalReqCounter = new promClient.Counter({
	name: 'http_express_total_req',
	help: 'Total number of requests',
});

const totalUnhandledErrors = new promClient.Counter({
	name: 'http_express_unhandles_errors',
	help: 'Total Number Of Unhandled Errors',
	labelNames: ['route'],
});

export { reqResTime, totalReqCounter, totalUnhandledErrors };
