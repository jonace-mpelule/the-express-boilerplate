import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['./src/bootstrap.ts'],
    clean: true,
    dts: true,
    splitting: false,
    sourcemap: true,
    minify: true,
    target: 'es2022',
    outDir: 'build',
    external: ['@prisma/client'],

})
