import expressLoader from './express.ts';
import { Express } from 'express';

export default async function ({ app }: { app: Express }) {
	await expressLoader({ app });
}
