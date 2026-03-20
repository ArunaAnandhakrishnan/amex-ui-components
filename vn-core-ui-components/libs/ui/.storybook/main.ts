import type { StorybookConfig } from '@storybook/angular';
import type { UserConfig } from 'vite';

const config: StorybookConfig & { viteFinal?: (config: UserConfig) => Promise<UserConfig> } = {
  stories: ['../**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config: UserConfig) {
    config.define = {
      ...config.define,
      STORYBOOK_ANGULAR_OPTIONS: JSON.stringify({}),
    };
    return config;
  },
};

export default config;
