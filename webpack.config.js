const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (_, {mode}) => {
    const isDevelopment = mode === 'development'

    return {
        entry: './src/index.ts',
        output: {
            filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
            path: path.resolve(__dirname, 'build'),
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: isDevelopment ? '[name].css' : '[name].[contenthash].css'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ]
        },
        resolve: {
            extensions: ['.ts', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'src/scripts'),
            }
        },
        devtool: isDevelopment ? 'inline-source-map' : false
    }
}