import eslintConfig from 'eslint-config-universal-code';

const config = eslintConfig({
  json: true,
  stylistic: true,
  unicorn: true,
  yml: true,
  html: true,
  perfectionist: true,
  typescript: true
});

export default config;