const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  // ── Remote name MUST match what the shell declares ──────────────
  name: 'payWithPointsPortal',

  // ── What this MFE exposes ────────────────────────────────────────
  exposes: {
    './Module': './src/app/pages/pay-with-points/pay-with-points.module.ts',
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
  // This remote is served on port 4207
  publicPath:  'http://localhost:4207/',
  scriptType:  'text/javascript',
  uniqueName:  'payWithPointsPortal',
};

module.exports = mfConfig;
