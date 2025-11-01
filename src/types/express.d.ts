import 'express';

declare global {
	namespace Express {
		interface Request {
			cauth?: {
				id: string;
				role: string;
			};
			
		}
	}
}
 