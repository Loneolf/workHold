module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ["plugin:vue/essential"],
	plugins: ["vue"],
	parserOptions: {
		parser: "@babel/eslint-parser",
	},
	rules: {
		"vue/multi-word-component-names": 0,
		// indent: ["error", "tab", { SwitchCase: 1 }], // 优先设置缩进为制表符
		// "no-tabs": ["off"], // 关闭禁止使用制表符的规则（如果有）
	},
};
