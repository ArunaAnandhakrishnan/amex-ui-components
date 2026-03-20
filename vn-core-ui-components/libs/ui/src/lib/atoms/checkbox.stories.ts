import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox';

const meta: Meta<CheckboxComponent> = {
  title: 'Atoms/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Unchecked: Story = {
  args: { label: 'Accept terms and conditions' },
};

export const Checked: Story = {
  args: { label: 'I agree to the privacy policy' },
  render: (args) => ({
    props: { ...args, checked: true },
    template: `<ui-checkbox [label]="label" [disabled]="disabled" [checked]="checked"></ui-checkbox>`,
  }),
};

export const Disabled: Story = {
  args: { label: 'Disabled option', disabled: true },
};
