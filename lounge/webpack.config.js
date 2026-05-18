const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  name: 'loungePortal',
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

// CRITICAL: publicPath must point to this remote's own port (4209)
// so all lazy chunks are fetched from the right host.
mfConfig.output = {
  ...mfConfig.output,
  publicPath:  'http://localhost:4209/',
  scriptType:  'text/javascript',
};

// @vn-core-ui-components/ui resolves via node_modules (built Angular library)

module.exports = mfConfig;
