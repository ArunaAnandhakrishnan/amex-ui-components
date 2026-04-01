import type { Meta, StoryObj } from '@storybook/angular';
import { AmexPageHeaderComponent } from './page-header';

const meta: Meta<AmexPageHeaderComponent> = {
  title: 'AMEX/Navigation/PageHeader',
  component: AmexPageHeaderComponent,
  tags: ['autodocs'],
  argTypes: { portalStyle: { control: 'radio', options: ['onls','oms'] } },
};
export default meta;
type Story = StoryObj<AmexPageHeaderComponent>;

export const ONLS_PriorityPass: Story = {
  name: 'ONLS — PRIORITY PASS™ ENROLLMENT',
  args: { portalStyle: 'onls', title: 'PRIORITY PASS™ ENROLLMENT' },
};
export const ONLS_ChangePassword: Story = {
  name: 'ONLS — Change Password',
  args: { portalStyle: 'onls', title: 'Change Password' },
};
export const OMS_EditProfile: Story = {
  name: 'OMS — EDIT YOUR PROFILE',
  args: { portalStyle: 'oms', title: 'EDIT YOUR PROFILE' },
};
export const OMS_MRMAdmin: Story = {
  name: 'OMS — MRM USER ADMINISTRATION',
  args: { portalStyle: 'oms', title: 'MRM USER ADMINISTRATION' },
};
