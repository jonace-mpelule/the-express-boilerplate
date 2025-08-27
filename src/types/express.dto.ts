import { Req } from '@reflet/express';

export interface CustomRequest extends Req {
	user?: any;
}
