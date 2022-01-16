// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

// module.exports = withBundleAnalyzer({
//   images: {
//     domains: ['deshi.programmingshikhi.com', 'api-ecom.programmingshikhi.com'],
//   },
//   webpack5: true
// })

module.exports = {
  images: {
    domains: ['deshibazaarbucket.s3.ap-southeast-1.amazonaws.com', 'deshibazaarbd.com', 'api.deshibazaarbd.com'],
  },
  webpack5: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}
