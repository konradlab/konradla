const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = (env, argv) => ({
    entry: path.resolve(__dirname, 'src') + '/app.js',
    resolve: {
        alias: {
            '~images': path.resolve(__dirname, './src/images'),
            '~fonts': path.resolve(__dirname, './src/fonts'),
        },
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                query: {
                    pretty: argv.mode === 'development',
                },
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name:
                                argv.mode === 'development'
                                    ? '[name].[ext]'
                                    : '[contenthash].[ext]',
                            outputPath: 'images',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 90,
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/pug/index.pug',
        }),
        new MiniCssExtractPlugin({
            filename:
                argv.mode === 'development'
                    ? '[name].css'
                    : '[name]-[contenthash].css',
            chunkFilename: '[id].css',
        }),
        new BrowserSyncPlugin(
            {
                host: 'localhost',
                port: 3000,
                proxy: 'localhost:9000',
            },
            {
                reload: false,
            }
        ),
    ],
});
