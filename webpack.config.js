const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir), {
        withFileTypes: true,
    });

    return templateFiles
        .filter((dirent) => dirent.isFile())
        .map((item) => {
            const parts = item['name'].split('.');
            const name = parts[0];
            const extension = parts[1];

            return new HtmlWebpackPlugin({
                filename: `${name}.html`,
                template: path.resolve(
                    __dirname,
                    `${templateDir}/${name}.${extension}`
                ),
            });
        });
}

const htmlPlugins = generateHtmlPlugins('./src/pug');

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
                notify: false,
            },
            {
                reload: false,
            }
        ),
    ].concat(htmlPlugins),
});