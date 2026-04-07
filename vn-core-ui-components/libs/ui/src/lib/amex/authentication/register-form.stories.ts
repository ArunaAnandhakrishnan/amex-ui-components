import type { Meta, StoryObj } from '@storybook/angular';
import { AmexRegisterFormComponent } from './register-form';

const meta: Meta<AmexRegisterFormComponent> = {
  title: 'AMEX/Authentication/RegisterForm',
  component: AmexRegisterFormComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexRegisterFormComponent>;

export const Empty: Story = {
  args: { portalTitle: '', errorMessage: '', successMessage: '' }
};

export const WithError: Story = {
  args: { portalTitle: '', errorMessage: 'Email address already registered. Please use a different email.', successMessage: '' }
};

export const WithSuccess: Story = {
  args: { portalTitle: '', errorMessage: '', successMessage: 'Registration successful. Please check your email to activate your account.' }
};
