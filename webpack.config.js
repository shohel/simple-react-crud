const path = require('path');

let env_mode = (process.env.NODE_ENV === 'production') ? 'production' : 'development';

module.exports = {
	watchOptions: {
		aggregateTimeout: 200,
		poll: 1000,
		ignored: /node_modules/,
	},
	mode: env_mode,
	entry: './src/Index.js',
	output: {
		path: path.resolve(__dirname, 'assets/js'),
		filename: 'main.js',
	},

	module: {
		rules: [
			{
				test: /\.?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
		]
	},
};