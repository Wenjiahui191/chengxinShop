module.exports = {
    productionSourceMap: false,
    // 关闭语法检查
    lintOnSave: false,
    // 跨域
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.98.123.211',
            },
        }
    }
}