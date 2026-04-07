import type { Meta, StoryObj } from '@storybook/angular';
import { AmexCustomizedReportsFormComponent } from './customized-reports-form';
const meta: Meta<AmexCustomizedReportsFormComponent> = { title: 'AMEX/Forms/CustomizedReportsForm', component: AmexCustomizedReportsFormComponent, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<AmexCustomizedReportsFormComponent>;
export const Default: Story = { name: 'OMS — Customized Reports (Settlement Detail active)', args: {} };
