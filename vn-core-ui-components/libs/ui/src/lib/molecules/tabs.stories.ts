import type { Meta, StoryObj } from '@storybook/angular';
import { TabsComponent } from './tabs';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'disabled', label: 'Disabled', disabled: true },
];

const meta: Meta<TabsComponent> = {
  title: 'Molecules/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<TabsComponent>;

export const Default: Story = {
  args: { tabs: TABS, activeTab: 'overview' },
  render: (args) => ({
    props: args,
    template: `<ui-tabs [tabs]="tabs" [activeTab]="activeTab">Tab content goes here.</ui-tabs>`,
  }),
};
