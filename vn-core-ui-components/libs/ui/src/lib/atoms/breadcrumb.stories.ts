import type { Meta, StoryObj } from '@storybook/angular';
import { BreadcrumbComponent } from './breadcrumb';

const meta: Meta<BreadcrumbComponent> = {
  title: 'Atoms/Breadcrumb',
  component: BreadcrumbComponent,
  tags: ['autodocs'],
  argTypes: { separator: { control: 'text' } },
};
export default meta;
type Story = StoryObj<BreadcrumbComponent>;

export const Default: Story = {
  args: {
    items: [{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Shoes' }],
  },
};
export const ChevronSeparator: Story = {
  args: {
    separator: '>',
    items: [{ label: 'Dashboard', href: '/' }, { label: 'Settings', href: '/settings' }, { label: 'Profile' }],
  },
};
