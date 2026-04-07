import type { Meta, StoryObj } from '@storybook/angular';
import { AmexForgotPasswordFormComponent } from './forgot-password-form';

const meta: Meta<AmexForgotPasswordFormComponent> = {
  title: 'AMEX/Authentication/ForgotPasswordForm',
  component: AmexForgotPasswordFormComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexForgotPasswordFormComponent>;

export const ONLSStyle: Story = {
  args: { portalStyle: 'onls', portalTitle: '', errorMessage: '' }
};

export const OMSStyle: Story = {
  args: { portalStyle: 'oms', portalTitle: 'Online Merchant Services', errorMessage: '' }
};

export const WithError: Story = {
  args: { portalStyle: 'onls', portalTitle: '', errorMessage: 'No account found for this username or email.' }
};
