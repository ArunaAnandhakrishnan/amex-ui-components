const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  name: 'cenLcyExcPortal',
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

// CRITICAL: publicPath must point to this remote's own port (4210)
mfConfig.output = {
  ...mfConfig.output,
  publicPath:  'http://localhost:4210/',
  scriptType:  'text/javascript',
};

module.exports = mfConfig;
