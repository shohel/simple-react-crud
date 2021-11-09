const path = require('path');

let env_mode = (process.env.NODE_ENV === 'production') ? 'production' : 'development';

module.exports = {
	watchOptions: {
		aggregateTimeout: 200,
		poll: 1000,
		ignored: /node_modules/,
	},
	mode: 'production',
	entry: './src/Index.js',
	optimization: {
		minimize: false
	},
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
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.module\.scss$/i,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							modules: {
								mode: "local",
								localIdentName: "[local]-[hash:base64:5]",
							},
						},
					},
					{
						loader: "sass-loader",
					},
				],
			},
		]
	},
};