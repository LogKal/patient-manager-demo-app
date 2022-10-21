const HtmlWebpackPlugin = require('html-webpack-plugin')

var path = require('path')

module.exports = (env) => {
    const PROD_RUN = env.production
    require('dotenv').config({
        path: `./${PROD_RUN ? '.env' : '.env.development'}`,
    })

    const API_URL = process.env.REACT_APP_API_URL
    const PORT = process.env.REACT_APP_PORT
    return {
        entry: './src/index.js',
        mode: PROD_RUN ? 'production' : 'development',
        devtool: PROD_RUN ? false : 'inline-source-map',
        cache: true,
        output: {
            path: path.resolve(__dirname, 'build'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'public', 'index.html'),
                favicon: path.join(__dirname, 'public', 'healthcare-icon.png'),
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.?js$/,
                    exclude: /node_modules/,
                    use: {
                        //babel transpiles
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                [
                                    '@babel/preset-react',
                                    //Replaces the import source when importing functions, defaults to react
                                    { runtime: 'automatic' },
                                ],
                            ],
                        },
                    },
                },
            ],
        },

        devServer: {
            port: PORT,
            https: false,
            //resolves cors
            proxy: {
                '/api/*': {
                    target: API_URL,
                    changeOrigin: true,
                    pathRewrite: { '^/api': '' },
                },
            },
        },
    }
}
