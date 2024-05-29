import path from 'path';
import { fileURLToPath } from 'url';
import getBaseConfig from './base.config.js';
import dotenv from 'dotenv';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const { parsed: env } = dotenv.config({
	path: path.join(dirname, '../.env'),
});

const baseConfig = getBaseConfig();

const config = {
	...baseConfig,
	mode: 'development',
	output: {
		publicPath: '/',
	},
	devtool: 'inline-source-map',
	devServer: {
		static: path.join(dirname, '../build'),
		historyApiFallback: true,
		port: env.DEV_SERVER_PORT,
		open: false,
		hot: true,
	},
};

export default config;
