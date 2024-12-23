module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ["plugin:vue/essential"],
	plugins: ['vue'],
	parserOptions: {
		parser: "@babel/eslint-parser",
	},
	rules: {
		"vue/multi-word-component-names": 0
	}
};
