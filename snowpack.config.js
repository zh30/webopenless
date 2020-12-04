/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: ['@snowpack/plugin-react-refresh', '@snowpack/plugin-dotenv'],
  install: [
    /* ... */
  ],
  installOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    out: 'docs',
    baseUrl: 'https://openless.zhanghe.cool/',
  },
  proxy: {
    /* ... */
  },
  alias: {
    /* ... */
  },
};
