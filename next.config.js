/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    prependData: `@import "${path.resolve(
      __dirname,
      "styles/application.scss"
    )}";`,
  },
  webpack(config) {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === "object")
      .oneOf.filter((rule) => Array.isArray(rule.use));

    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (
          moduleLoader.loader?.includes("css-loader") &&
          !moduleLoader.loader?.includes("postcss-loader")
        )
          moduleLoader.options.modules.getLocalIdent = (
            context,
            _,
            exportName
          ) => {
            const root = path
              .relative(context.rootContext, path.dirname(context.resourcePath))
              .split("/")
              .slice(-1)
              .join("-");

            const rootClass =
              root.charAt(0).toLowerCase() +
              root
                .slice(1)
                .replace(/([A-Z])/g, "-$1")
                .trim()
                .toLowerCase();

            if (rootClass !== exportName) {
              return `${rootClass}-${exportName}`;
            } else {
              return `${exportName}`;
            }
          };
      });
    });

    return config;
  },
};

module.exports = nextConfig;
