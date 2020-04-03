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
                target: "http://frozen.brokenstory.club/",
                changeOrigin: true,
                pathRewrite: {
                    '^/': ''
                }
            }
        }
    }
};
