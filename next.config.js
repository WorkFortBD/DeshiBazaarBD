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
    domains: ['ecom-api.devmative.com', 'deshibazar.netlify.app', 'ecom-api.devmative.com','127.0.0.1'],
  },
  webpack5: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  typescript: {
    // @TODO: Remove this line in near future after implementing all in typescript
    // Dangerously allow production builds to successfully complete even if your project has type errors.
    ignoreBuildErrors: true,
  },
}
