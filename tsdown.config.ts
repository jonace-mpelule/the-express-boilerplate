import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: ['./src/bootstrap.ts'],
	clean: true,
	dts: true,
	format: 'cjs',
	sourcemap: true,
	minify: true,
	target: 'es2022',
	outDir: 'build',
	external: ['@prisma/client'],
	ignoreWatch: [''],
	define: {
		'process.env.NODE_ENV': JSON.stringify('production'),
		'process.env.ENV': JSON.stringify('production'),
	},
});
