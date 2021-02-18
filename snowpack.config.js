/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/dist',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
  ],
  buildOptions: {
    out: 'docs',
    baseUrl: 'https://openless.zhanghe.cool/',
  },
  packageOptions: {
    source: 'remote',
    types: true,
  },
};