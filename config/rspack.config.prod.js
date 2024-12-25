const path = require("path");
const rspack = require("@rspack/core");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	output: {
		path: path.resolve(__dirname, "../dist"),
		clean: true,
		filename: "js/[name].js",
		chunkFilename: "js/[name].chunk.js",
		assetModuleFilename: "asset/[name].[ext]", // images/test.png
	},
	mode: "production", // development | production
	// devtool: "source-map",
	devtool: false,
	plugins: [
		new rspack.CssExtractRspackPlugin({
			// 默认生成main.css
			filename: "style/[name]_[contenthash:6].css", // 生成的文件放在dest/style目录下，文件名为hash值
		}),
		new rspack.CopyRspackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "../public"),
					to: path.resolve(__dirname, "../dist"),
					globOptions: {
						// 忽略index.html文件
						ignore: ["**/index.html"],
					},
				},
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.(css|less)$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					"less-loader"
				],
			},
			{
				test: /\.(css|less)$/,
				use: [
					rspack.CssExtractRspackPlugin.loader,
					{
						loader: "css-loader",
					},
					{
						loader: "postcss-loader",
					},
					{
						loader: 'less-loader',
						options: {
						// ...
						},
					},
				],
				// 如果你需要将 '*.module.less' 视为 CSS Modules 那么将 'type' 设置为 'css/auto' 否则设置为 'css'
				type: 'css/auto',
			  },
		]
	},
	optimization: {
		minimizer: [
			new rspack.SwcJsMinimizerRspackPlugin({
				minimizerOptions: {
					format: {
						comments: false,
					},
				},
			}),
			new rspack.LightningCssMinimizerRspackPlugin({
				minimizerOptions: {
					errorRecovery: false,
				},
			}),
		],
	},
};
