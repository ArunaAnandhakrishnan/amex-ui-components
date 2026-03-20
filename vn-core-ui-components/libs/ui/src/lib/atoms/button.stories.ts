import type { Meta, StoryObj } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { ButtonComponent } from './button';

const meta: Meta<ButtonComponent> = {
  title: 'Atoms/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = { args: { label: 'Primary Button', variant: 'primary', size: 'md' } };
export const Secondary: Story = { args: { label: 'Secondary Button', variant: 'secondary', size: 'md' } };
export const Small: Story = { args: { label: 'Small', variant: 'primary', size: 'sm' } };
export const Large: Story = { args: { label: 'Large', variant: 'primary', size: 'lg' } };
export const Disabled: Story = { args: { label: 'Disabled', variant: 'primary', disabled: true } };
