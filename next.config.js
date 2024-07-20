const NextFederationPlugin = require("@module-federation/nextjs-mf");

module.exports = {
  webpack(config, options) {
    const { isServer } = options;

    config.plugins.push(
      new NextFederationPlugin({
        name: "remote1",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./Pokemon": "./src/components/Atomos/Pokemon1",
        },
        shared: {
          react: {
            singleton: true,
          },
          "react-dom": {
            singleton: true,
          },
        },
      })
    );

    return config;
  },
};
