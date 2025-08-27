import { Next, Req, Res } from '@reflet/express';

interface CustomRequest<T = any> extends Req {
	user?: any;
	parsed?: T;
}

export function BotParser() {
	return (req: CustomRequest<{ isBot: boolean }>, res: Res, next: Next) => {
		const userAgent = req.headers['user-agent'] || '';
		const isBot = isCrawler(userAgent);

		console.log('🧠 BotParser ran. isBot:', isBot);

		req.parsed = {
			...(req.parsed || {}),
			isBot,
		};

		next();
	};
}

function isCrawler(userAgent: string | undefined) {
	if (!userAgent) return false;
	const crawlers = [
		/facebookexternalhit/i,
		/Twitterbot/i,
		/Slackbot/i,
		/WhatsApp/i,
		/TelegramBot/i,
		/LinkedInBot/i,
		/Discordbot/i,
		/Googlebot/i,
		/Bingbot/i,
	];
	return crawlers.some((crawler) => crawler.test(userAgent));
}
