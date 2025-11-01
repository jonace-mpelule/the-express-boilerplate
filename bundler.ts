await Bun.build({
    entrypoints: ['./src/bootstrap.ts'],
    target: 'bun',
    outdir: './dist',
    minify: true, 
    splitting: true
})

export {}