const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  name: 'shell',
  remotes: {
    btaPortal:       'btaPortal@http://localhost:4203/remoteEntry.js',
    offersPortal:    'offersPortal@http://localhost:4204/remoteEntry.js',
    wearablesPortal: 'wearablesPortal@http://localhost:4206/remoteEntry.js',
    payWithPointsPortal: 'payWithPointsPortal@http://localhost:4207/remoteEntry.js',
    loungePortal:        'loungePortal@http://localhost:4209/remoteEntry.js',
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
