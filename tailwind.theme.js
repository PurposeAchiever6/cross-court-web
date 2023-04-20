import resolveConfig from 'tailwindcss/resolveConfig';

const tailwindConfig = require('./tailwind.config');

const config = resolveConfig(tailwindConfig);
const { theme } = config;

export default theme;
