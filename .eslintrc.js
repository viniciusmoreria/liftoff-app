module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  globals: {
    __DEV__: true,
    NodeJS: true,
    JSX: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'unused-imports'],
  rules: {
    'no-undef': 'warn',
    'no-unused-vars': 'off',
    'no-constant-binary-expression': 'error',
    'react/self-closing-comp': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'error',
      {
        additionalHooks:
          '(useMotiPressableTransition|useMotiPressable|useMotiPressables|useMotiPressableAnimatedProps|useInterpolateMotiPressable)',
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-empty': 'warn',
    'react/display-name': 'warn',
    'no-async-promise-executor': 'warn',
    '@typescript-eslint/no-unused-vars': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
