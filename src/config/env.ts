import z from 'zod';

const envSchema = z.object({
	PORT: z.coerce.number().min(1000),
	MORGAN: z.string(),
	ACCESS_TOKEN_SECRET: z.string(),
	REFRESH_TOKEN_SECRET: z.string(),
	ENV: z
		.union([
			z.literal('production'),
			z.literal('development'),
			z.literal('test'),
		])
		.default('development'),
});


const parse = envSchema.safeParse(Bun.env ?? {});

if (!parse.success) {
	console.error(
		'❌ Invalid environment variables:',
		parse.error.flatten().fieldErrors,
	);
	throw new Error('Invalid environment variables');
}

export default parse.data;
