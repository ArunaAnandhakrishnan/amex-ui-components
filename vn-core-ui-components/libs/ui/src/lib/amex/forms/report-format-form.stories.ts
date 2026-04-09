import type { Meta, StoryObj } from '@storybook/angular';
import { AmexReportFormatFormComponent } from './report-format-form';
const meta: Meta<AmexReportFormatFormComponent> = { title: 'AMEX/Forms/ReportFormatForm', component: AmexReportFormatFormComponent, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<AmexReportFormatFormComponent>;
export const Default: Story = { name: 'OMS — Select report formats (image22)', args: {} };
export const WithEmail: Story = { name: 'With email subscription enabled', args: { } };
