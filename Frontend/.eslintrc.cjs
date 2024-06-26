module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['dist/', 'node_modules/'],
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
    'import',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-argument':
      'off',
    '@typescript-eslint/no-unsafe-member-access':
      'off',
    '@typescript-eslint/no-unsafe-assignment':
      'off',
    '@typescript-eslint/no-misused-promises':
      'warn',
    '@typescript-eslint/restrict-template-expressions':
      'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/restrict-template-expressions':
      'warn',
    '@typescript-eslint/no-floating-promises':
      'off',
    '@typescript-eslint/no-misused-promises':
      'off',
    '@typescript-eslint/no-unnecessary-type-constraint':
      'warn',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal'],
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    quotes: ['error', 'single'],
    'no-duplicate-imports': 'error',
    'no-console': [
      'warn',
      { allow: ['warn', 'error', 'info'] },
    ],
    'no-unused-vars': 'warn',
    'no-multiple-empty-lines': 'warn',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
};
