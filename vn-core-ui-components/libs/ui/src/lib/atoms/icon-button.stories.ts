import type { Meta, StoryObj } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { IconButtonComponent } from './icon-button';

const meta: Meta<IconButtonComponent> = {
  title: 'Atoms/IconButton',
  component: IconButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['primary','ghost','danger'] },
    size: { control: 'radio', options: ['sm','md','lg'] },
    icon: { control: 'text' },
    clicked: { action: 'clicked' },
  },
};
export default meta;
type Story = StoryObj<IconButtonComponent>;

export const Ghost: Story = { args: { icon: '✏️', ariaLabel: 'Edit', variant: 'ghost', clicked: action('clicked') } };
export const Primary: Story = { args: { icon: '＋', ariaLabel: 'Add', variant: 'primary', clicked: action('clicked') } };
export const Danger: Story = { args: { icon: '🗑', ariaLabel: 'Delete', variant: 'danger', clicked: action('clicked') } };
export const Disabled: Story = { args: { icon: '✏️', ariaLabel: 'Edit', disabled: true } };
