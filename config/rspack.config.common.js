const path = require("path");
const rspack = require("@rspack/core");
const ESLintPlugin = require("eslint-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
	entry: "./src/main.js",
	plugins: [
		new rspack.HtmlRspackPlugin({
			template: path.resolve(__dirname, "../public/index.html"), // 以该文件为模板生成HTML
			inject: "body",
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
			// {
			// 	test: /\.js$/,
			// 	include: path.resolve(__dirname, "../src"),
			// 	loader: "babel-loader",
			// 	options: {
			// 		cacheDirectory: true,
			// 		cacheCompression: false,
			// 	},
			// },
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
				  // 注意，为了绝大多数功能的可用性，请确保该选项为 `true`
				  experimentalInlineMatchResource: true,
				},
			},
			// {
			// 	test: /\.vue$/,
			// 	loader: "vue-loader",
			// 	options: {
			// 		// 开启缓存
			// 		cacheDirectory: path.resolve(__dirname," ../node_modules/.cache/vue-loader"),
			// 	},
			// },
		],
	},
	resolve: {
		extensions: [".vue", ".js", ".json"], // 自动补全文件扩展名，让jsx可以使用
		// 路径别名
		alias: {
			"~": path.resolve(__dirname, "../src"),
			"~p": path.resolve(__dirname, "../src/page"),
			"~s": path.resolve(__dirname, "../src/serve"),
			"~sa": path.resolve(__dirname, "../src/assets"),
			"@sa": path.resolve(__dirname, "../src/assets"),
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