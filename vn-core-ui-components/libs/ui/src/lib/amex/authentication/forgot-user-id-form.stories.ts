import type { Meta, StoryObj } from '@storybook/angular';
import { AmexForgotUserIdFormComponent } from './forgot-user-id-form';

const meta: Meta<AmexForgotUserIdFormComponent> = {
  title: 'AMEX/Authentication/ForgotUserIdForm',
  component: AmexForgotUserIdFormComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexForgotUserIdFormComponent>;

export const Default: Story = {
  args: { portalTitle: '', errorMessage: '' }
};

export const WithError: Story = {
  args: { portalTitle: '', errorMessage: 'No account found for this email address.' }
};
