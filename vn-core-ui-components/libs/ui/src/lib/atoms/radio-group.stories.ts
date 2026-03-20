import type { Meta, StoryObj } from '@storybook/angular';
import { RadioGroupComponent } from './radio-group';

const SIZES = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
];

const meta: Meta<RadioGroupComponent> = {
  title: 'Atoms/RadioGroup',
  component: RadioGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'radio', options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<RadioGroupComponent>;

export const Vertical: Story = {
  args: { options: SIZES, name: 'size', orientation: 'vertical' },
};

export const Horizontal: Story = {
  args: { options: SIZES, name: 'size-h', orientation: 'horizontal' },
};

export const Disabled: Story = {
  args: { options: SIZES, name: 'size-d', disabled: true },
};
