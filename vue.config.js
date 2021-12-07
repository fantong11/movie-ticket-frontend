module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://movie-ticket-web-backend.herokuapp.com/api/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },
}