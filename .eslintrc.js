module.exports = {
  plugins: ['node', 'jest'],
  extends: ['plugin:node/recommended', 'airbnb-base'],
  rules: {
    'node/exports-style': ['error', 'module.exports'],
    'prefer-destructuring': ['error', { object: false, array: false }],
    strict: 0,
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
      imports: 'always-multiline',
      objects: 'always-multiline',
    }],
    'no-console': 0,
    'prefer-object-spread': 0,
    'default-param-last': 'off',
    'prefer-regex-literals': 'off',
    'max-len': ['error', {
      code: 100,
      tabWidth: 2,
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignorePattern: '\\* @typedef \\{import',
    }],
  },
  env: {
    node: true,
    'jest/globals': true,
  },
  overrides: [{
    files: '"./tests/**/*.spec.js"',
    rules: {
      'node/no-unpublished-require': 0,
      'node/no-missing-require': 0,
    },
  }],
};
