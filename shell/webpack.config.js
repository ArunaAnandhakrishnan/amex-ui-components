const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  name: 'shell',
  remotes: {
    btaPortal:       'btaPortal@http://localhost:4203/remoteEntry.js',
    offersPortal:    'offersPortal@http://localhost:4204/remoteEntry.js',
    wearablesPortal: 'wearablesPortal@http://localhost:4205/remoteEntry.js',
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
  publicPath: 'http://localhost:4200/',
  scriptType: 'text/javascript',
};

// @vn-core-ui-components/ui resolves naturally via node_modules (built Angular library)

module.exports = mfConfig;
