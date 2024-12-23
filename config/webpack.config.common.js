const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");

module.exports = {
	entry: "./src/main.js",
	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, "../public/index.html"), // 以该文件为模板生成HTML
		}),
		new ESLintPlugin({
			context: path.resolve(__dirname, "../src"),
			exclude: "node_modules",
			cache: true,
			cacheLocation: path.resolve(
				__dirname,
				"../node_modules/.cache/.eslintcache"
			),
		}),
		
		new VueLoaderPlugin(),
		// cross-env定义的环境变量给打包工具使用
		// DefinePlugin定义环境变量给源代码使用，从而解决vue3页面警告的问题
		new DefinePlugin({
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false,
		}),
	],
	module: {
		rules: [
			{
				test: /\.(jp?eg|png|svg|webp|gif)$/, // 用正则匹配以jpg为结尾的资源
				type: "asset",
				// asset 自动根据文件大小生成资源或者base64的url，默认值为8K 4*1024
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024, //
					},
				},
			},
			{
				test: /\.(woff|woff2|ttf|otf|eot|txt)$/,
				type: "asset/resource",
			},
			{
				test: /\.js$/,
				include: path.resolve(__dirname, "../src"),
				loader: "babel-loader",
				options: {
					cacheDirectory: true,
					cacheCompression: false,
				},
			},
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					// 开启缓存
					cacheDirectory: path.resolve(__dirname," ../node_modules/.cache/vue-loader"),
				},
			},
		],
	},
	resolve: {
		extensions: [".vue", ".js", ".json"], // 自动补全文件扩展名，让jsx可以使用
		// 路径别名
		alias: {
			"~": path.resolve(__dirname, "../src"),
			"~p": path.resolve(__dirname, "../src/page"),
			"~s": path.resolve(__dirname, "../src/serve"),
			"~u": path.resolve(__dirname, "../src/util"),
			"~st": path.resolve(__dirname, "../src/store"),
			"~l": path.resolve(__dirname, "../src/lib"),
			"~ls": path.resolve(__dirname, "../src/lib/scripts"),
			"~lt": path.resolve(__dirname, "../src/lib/TZT"),
		},
	},
	optimization: {
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				vue: {
					test: /[\\/]node_modules[\\/]vue(.*)?[\\/]/,
					name: "vue-chunk",
					priority: 40,
				},
				libs: {
					test: /[\\/]node_modules[\\/]/,
					name: "libs-chunk",
					priority: 20,
				},
				tzt: {
					test: /[\\/]lib[\\/]/,
					name: "tzt-chunk",
					priority: 30,
				}
			},
		},
		runtimeChunk: {
			name: (entrypoint) => `runtime~${entrypoint.name}.js`,
		},
		removeEmptyChunks: false,
		chunkIds: 'named',
	},
};
