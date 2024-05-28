import path from 'path';
import { fileURLToPath } from 'url';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import getBaseConfig from './base.config.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const mainConfig = getBaseConfig(MiniCssExtractPlugin.loader);

const config = {
	...mainConfig,
	mode: 'production',
	output: {
		path: path.resolve(dirname, '../build'),
		filename: '[name].[contenthash].js',
		publicPath: '/',
	},
	plugins: [
		...mainConfig.plugins,
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].css',
		}),
	],
};

export default config;
