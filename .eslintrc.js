module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true,
  },
  'extends': [
    'eslint:recommended'
  ],
  rules: {
    'quotes': ['error', 'single'],
    'no-mixed-spaces-and-tabs':[2, 'smart-tabs']
  }
};