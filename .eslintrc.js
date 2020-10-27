module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 0,
    'no-undef': 0,
    'key-spacing': 0,
    'space-before-function-paren': 0,
    'spaced-comment': 0,
    'comma-dangle': 0,
    'space-before-blocks': 0,
    'no-trailing-spaces': 0,
    'no-multiple-empty-lines': 0,
    'eol-last': 0,
    semi: 0,
    'object-property-newline': 0,
    'comma-spacing': 0,
    indent: 0,
    'keyword-spacing': 0,
    'space-infix-ops': 0,
    'arrow-spacing': 0,
    'object-curly-spacing': 0,
    'no-dupe-keys': 0,
    'vue/no-dupe-keys': 0
  }
}
