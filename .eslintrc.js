const path = require('path');

module.exports =  {
  parser:  '@typescript-eslint/parser',
  extends:  [
    'airbnb',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions:  {
    ecmaVersion:  2018,
    sourceType:  'module',
    ecmaFeatures:  {
      jsx:  true,
    },
  },
  plugins: [
    'no-param-reassign-allow-reduce',
    'react-hooks',
  ],
  rules:  {
    'object-curly-newline': 'off',
    'no-confusing-arrow': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'no-param-reassign-allow-reduce/allow-reduce': 2,
    'no-param-reassign-allow-reduce/no-reduce-identifiers': 2,
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/prop-types': 'off', // TODO: Find a way to autogenerate prop types from TypeScript definitions
    'react/jsx-filename-extension': [1, { 'extensions': ['.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings:  {
    react:  {
      version:  'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: {
        map: [
          ['@src', path.resolve(__dirname, 'src')],
        ],
        extensions: ['.tsx'],
      },
    },
  },
};