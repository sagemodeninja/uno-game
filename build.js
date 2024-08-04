const esbuild = require('esbuild')
const esbuildPluginTsc = require('esbuild-plugin-tsc')

async function buildContext(options) {
    return await esbuild.context({
        ...options,
        outdir: 'www',
        bundle: true,
        minify: true,
        plugins: [
            esbuildPluginTsc({ force: true })
        ]
    })
}

async function build() {
    const serverCtx = await buildContext({
        entryPoints: ['src/server.ts'],
        platform: 'node'
    })

    const appContext = await buildContext({
        entryPoints: ['src/index.ts']
    })

    await serverCtx.watch()
    await appContext.watch()
}

build().then(() => {
    console.log(`Listening for changes...`)
})