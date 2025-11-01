import type { Express } from 'express';
import expressLoader from './express.ts';

export default async function ({ app }: { app: Express }) {
	await expressLoader({ app });
}
