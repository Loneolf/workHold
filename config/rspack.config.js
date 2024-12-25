const { merge } = require("webpack-merge");

const commonConfig = require("./rspack.config.common");
const productionConfig = require("./rspack.config.prod");
const developmentConfig = require("./rspack.config.dev");

module.exports = () => {
  console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  switch (process.env.NODE_ENV, merge(commonConfig, developmentConfig)) {
    case "development":
      return merge(commonConfig, developmentConfig);
    case "production":
      return merge(commonConfig, productionConfig);
    default:
      return new Error("No match configuration was found");
  }
};