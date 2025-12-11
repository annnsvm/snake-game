module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:prettier/recommended', // enables prettier plugin + disables conflicts
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    // Customize rules as you like
    'import/prefer-default-export': 'off', // allow single named exports
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        trailingComma: 'es5',
        printWidth: 100,
        tabWidth: 2,
      },
    ],
  },
};
