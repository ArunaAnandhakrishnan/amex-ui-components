const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  // ✅ FIX: was 'btaPortal' — must match the shell's remotes map key:
  //         wearablesPortal@http://localhost:4206/remoteEntry.js
  name: 'wearablesPortal',
  exposes: {
    './Module': './src/app/remote-entry/entry.module.ts',
  },
  shared: {
    ...shareAll({
      singleton:       true,
      strictVersion:   false,
      requiredVersion: 'auto',
    }),
    // NOTE: Do NOT add eager:true here for any package.
    // eager:true belongs only in the shell/host webpack config, never in remotes.
    // Adding it in a remote causes:
    //   "Cannot read properties of undefined (reading 'import')" during ng build setup.
  },
});

// CRITICAL: publicPath so ALL chunk requests from this remote
// resolve to port 4206, not the shell's port 4200.
mfConfig.output = {
  ...mfConfig.output,
  publicPath: 'http://localhost:4206/',
  scriptType: 'text/javascript',
};

module.exports = mfConfig;