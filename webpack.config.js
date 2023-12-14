/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");



module.exports = {
	entry: { myAppName: path.resolve(__dirname, "./src/index.js") },
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].js",
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
			{
				test: /\.svg$/,
				use: [
					"file-loader",
					"svgo-loader"
				]
			},
			// {
			// 	test: /\.(png|jpe?g|gif)$/i,
			// 	use: [
			// 		{
			// 			loader: "file-loader",
			// 		},
			// 	],
			// },
			{
				test: /\.(jpe?g|png|gif)$/i,
				type: "asset",
			},
		],
	},
	optimization: {
		minimizer: [
			"...",
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						// Lossless optimization with custom option
						// Feel free to experiment with options for better result for you
						plugins: [
							["gifsicle", { interlaced: true }],
							["jpegtran", { progressive: true }],
							["optipng", { optimizationLevel: 5 }],
						],
					},
				},
			}),
		],
	},
	resolve: {
		extensions: ["*", ".js", ".jsx", ".scss"],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: "ABZ",
			template: "./src/index.html"
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
	],
	devServer: {
		port: 3001,
		hot: true,
	},
};
