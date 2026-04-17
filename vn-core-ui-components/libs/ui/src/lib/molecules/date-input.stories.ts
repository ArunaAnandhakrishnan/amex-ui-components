import type { Meta, StoryObj } from '@storybook/angular';
import { DateInputComponent } from './date-input';

const meta: Meta<DateInputComponent> = {
  title: 'Molecules/DateInput',
  component: DateInputComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'form-validation', 'screen-reader', 'keyboard-navigation'],
  argTypes: { disabled: { control: 'boolean' }, error: { control: 'text' } },
};
export default meta;
type Story = StoryObj<DateInputComponent>;

export const Default: Story = { args: {} };
export const WithRange: Story = { args: { min: '2024-01-01', max: '2024-12-31' } };
export const WithError: Story = { args: { error: 'Please select a valid date' } };
export const Disabled: Story = { args: { disabled: true } };
