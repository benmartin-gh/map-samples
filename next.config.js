const withTM = require('next-transpile-modules')(['@googlemaps/typescript-guards']); // pass the modules you would like to see transpiled

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);
