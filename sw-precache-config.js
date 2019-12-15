module.exports = {
  staticFileGlobs: [
    'build/static/**',
    'build/index.html',
  ],
  swFilePath: './build/service-worker.js',
  stripPrefix: 'build/',
  navigateFallback: '/index.html',
  runtimeCaching: [{
    urlPattern: new RegExp(`^${process.env.REACT_APP_API}`),
    handler: 'networkFirst',
  }],
};
