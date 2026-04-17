import type { Meta, StoryObj } from '@storybook/angular';
import { AmexChangePasswordFormComponent } from './change-password-form';

const meta: Meta<AmexChangePasswordFormComponent> = {
  title: 'AMEX/Authentication/ChangePasswordForm',
  component: AmexChangePasswordFormComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'needs-improvement', 'keyboard-navigation', 'screen-reader', 'form-validation'],
};
export default meta;
type Story = StoryObj<AmexChangePasswordFormComponent>;

export const ONLSStyle: Story = {
  args: { portalStyle: 'onls', portalTitle: '', errorMessage: '', successMessage: '' }
};

export const OMSStyle: Story = {
  args: { portalStyle: 'oms', portalTitle: 'Online Merchant Services', errorMessage: '', successMessage: '' }
};

export const ONLSWithSuccess: Story = {
  args: { portalStyle: 'onls', portalTitle: '', errorMessage: '', successMessage: 'Your password has been changed successfully.' }
};

export const OMSWithError: Story = {
  args: { portalStyle: 'oms', portalTitle: 'Online Merchant Services', errorMessage: 'Current password is incorrect. Please try again.', successMessage: '' }
};
