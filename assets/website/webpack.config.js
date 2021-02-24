const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const {
    WebpackManifestPlugin,
} = require('webpack-manifest-plugin');
const {
    CleanWebpackPlugin,
} = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const baseOutputPath = path.resolve('../../public/build/website');

    return {
        entry: {
            main: ['./js/main.js', './scss/main.scss'],
            modernizr: './js/vendor/modernizr-custom.js',
        },
        output: {
            publicPath: 'build/website/',
            path: baseOutputPath,
            filename: 'js/[name].[contenthash].js',
        },
        plugins: [
            new webpack.DefinePlugin({
                __DEV__: !isProduction,
                __ENV__: JSON.stringify(argv.mode),
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash].css',
            }),
            new WebpackManifestPlugin({
                fileName: baseOutputPath + '/manifest.json',
                map: (data) => Object.assign({}, data, {
                    name: '/' + path.dirname(data.path) + '/' + data.name,
                }),
            }),
            new CleanWebpackPlugin(),
            new CleanObsoleteChunks(),
        ],
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules)/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.(scss)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: (resourcePath, context) => {
                                    return path.relative(path.dirname(resourcePath), context) + '/';
                                },
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
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
                    test: /\.(png|jpg|jpeg|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name].[hash][ext][query]',
                    },
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name].[hash][ext][query]',
                    },
                },
            ],
        },
        optimization: {
            minimizer: [new TerserPlugin({
                extractComments: false,
            })],
        },
    };
};
