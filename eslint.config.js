const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
  eslintPluginPrettierRecommended,
  {
    files: ['/src/**/*.js'],
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
    },
  },
];
