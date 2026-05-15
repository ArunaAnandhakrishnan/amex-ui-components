const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  name: 'shell',
  remotes: {
    // ── IMPORTANT: remote name MUST match the `name` in each remote's webpack.config.js ──
    btaPortal:           'btaPortal@http://localhost:4203/remoteEntry.js',
    offersPortal:        'offersPortal@http://localhost:4204/remoteEntry.js',
    // payWithPointsPortal name matches webpack.config.js `name: 'payWithPointsPortal'`
    payWithPointsPortal: 'payWithPointsPortal@http://localhost:4207/remoteEntry.js',
  },
  shared: {
    ...shareAll({
      singleton:       true,
      strictVersion:   false,
      requiredVersion: 'auto',
    }),
  },
});

mfConfig.output = {
  ...mfConfig.output,
  publicPath:  'http://localhost:4200/',
  scriptType:  'text/javascript',
  uniqueName:  'shell',
};

module.exports = mfConfig;
