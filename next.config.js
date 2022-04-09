/* eslint-disable no-undef */
const path = require("path");
const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
  images: {
    domains: ["assets.pokemon.com"],
  },
  webpack(config) {
    config.resolve.alias["~"] = path.join(__dirname, "/");
    config.resolve.alias.lib = path.join(__dirname, "src/lib");
    config.resolve.alias.utils = path.join(__dirname, "src/utils");
    config.resolve.alias.hooks = path.join(__dirname, "src/hooks");
    config.resolve.alias.store = path.join(__dirname, "src/store");
    config.resolve.alias.styles = path.join(__dirname, "src/styles");
    config.resolve.alias.containers = path.join(__dirname, "src/containers");
    config.resolve.alias.components = path.join(__dirname, "src/components");

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
});
