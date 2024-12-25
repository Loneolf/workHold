const path = require("path");


module.exports = {
	output: {
		path: undefined,
		filename: "js/[name].js",
		chunkFilename: "js/[name].chunk.js",
		assetModuleFilename: "[name]_[hash:10].[ext]", // images/test.png
	},
	mode: "development",
	devtool: "cheap-module-source-map",
	plugins: [
		
	],
	module: {
		rules: [
			{
				test: /\.(css|less)$/,
				use: [
					"vue-style-loader",
					"css-loader",
					"postcss-loader",
					"less-loader"
				],
				type: 'javascript/auto',
				// type: 'css/auto',
			},
		]
	},
	devServer: {
		client: {
			overlay: false,
		},
		compress: true,
		// 自定义端口号
		port: 3000,
		open: false,
		hot: true,
		historyApiFallback: true,
		proxy: [
			{ // 配置代理
				"/reqxml": "http://127.0.0.1:80",
				"/reqreadfile": "http://127.0.0.1:80",
				"/reqlocal": "http://127.0.0.1:80",
				"/reqreadmap": "http://127.0.0.1:80",
				"/reqsavemap": "http://127.0.0.1:80",
			}
		],
	},
};
