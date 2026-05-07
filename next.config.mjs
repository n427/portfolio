const isProd = process.env.NODE_ENV === 'production';

export default {
  output: 'export',
  basePath: isProd ? '/portfolio' : '',
  assetPrefix: isProd ? '/portfolio/' : undefined,  // undefined in dev
  images: { unoptimized: true },
};