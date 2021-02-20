/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/dist',
  },
  plugins: [
    '@snowpack/plugin-sass',
    '@snowpack/plugin-postcss',
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    [
      'snowpack-plugin-wasm-pack',
      {
        projectPath: './wasm',
      },
    ],
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
