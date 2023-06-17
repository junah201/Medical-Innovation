module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/recommended",
	],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "react-hooks", "@typescript-eslint", "prettier", "import"],
	rules: {
		"react/jsx-uses-react": "off",
		"react/react-in-jsx-scope": "off",
		"import/order": [
			"error",
			{
				groups: [
					["builtin", "external"],
					["internal"],
					["parent", "sibling", "index"],
				],
				"newlines-between": "always",
				alphabetize: { order: "asc", caseInsensitive: true },
			},
		],
		quotes: ["error", "single"],
		"no-duplicate-imports": "error",
		"no-console": ["warn", { allow: ["warn", "error", "info"] }],
		"no-unused-vars": "warn",
		"no-multiple-empty-lines": "warn",
	},
	settings: {
		"import/resolver": {
			typescript: {},
		},
		react: {
			version: "detect",
		},
	},
};
