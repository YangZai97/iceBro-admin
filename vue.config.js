module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'assts',
    productionSourceMap: false,
    devServer: {
        port: 80,
        host: '0.0.0.0',
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/api': {
                target: process.env.PROXY_HOST,
                changeOrigin: true,
                pathRewrite: {
                    '^/': ''
                }
            }
        }
    }
};
