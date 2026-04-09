import type { Meta, StoryObj } from '@storybook/angular';
import { AmexAlgeriaPaymentFormComponent } from './algeria-payment-form';
const meta: Meta<AmexAlgeriaPaymentFormComponent> = { title: 'AMEX/Forms/AlgeriaPaymentForm', component: AmexAlgeriaPaymentFormComponent, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<AmexAlgeriaPaymentFormComponent>;
export const Default: Story = { name: 'SOC/ROC — Algeria Payment (image38)', args: {} };
export const WithData: Story = { name: 'Pre-filled', args: {} };
