module.exports = {
  'env': {
    'node': true,
    'commonjs': true,
    'es2020': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 11,
  },
  'rules': {
    'semi': ['error', 'never']
  },
}
