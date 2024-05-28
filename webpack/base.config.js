import path from 'path';
import { fileURLToPath } from 'url';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getConfig = (styleLoader = 'style-loader') => ({
	entry: './src/entry.tsx',
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@babel/preset-typescript',
						],
					},
				},
			},

			{
				test: /\.global\.css$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: false,
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'@': path.join(dirname, '../src'),
		},
	},
	optimization: {
		splitChunks: { chunks: 'all' },
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
		new ForkTsCheckerWebpackPlugin({
			async: false,
		}),
		new ESLintPlugin({
			extensions: ['js', 'jsx', 'ts', 'tsx'],
		}),
	],
});

export default getConfig;
