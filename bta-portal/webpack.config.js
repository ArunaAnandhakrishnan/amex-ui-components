const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  name: 'btaPortal',
  exposes: {
    './Module': './src/app/remote-entry/entry.module.ts',
  },
  shared: {
    ...shareAll({
      singleton:       true,
      strictVersion:   false,
      requiredVersion: 'auto',
    }),
  },
});

// CRITICAL: Set publicPath so ALL chunk requests from this remote
// are resolved to port 4203, not the shell's port 4200.
// Without this, shared chunks like common.js get fetched from the wrong host.
mfConfig.output = {
  ...mfConfig.output,
  publicPath:  'http://localhost:4203/',
  scriptType:  'text/javascript',
};

// @vn-core-ui-components/ui resolves naturally via node_modules (built Angular library)

module.exports = mfConfig;
