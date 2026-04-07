import type { Meta, StoryObj } from '@storybook/angular';
import { AmexCurrencyMasterFormComponent } from './currency-master-form';

const meta: Meta<AmexCurrencyMasterFormComponent> = {
  title: 'AMEX/Forms/CurrencyMasterForm',
  component: AmexCurrencyMasterFormComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexCurrencyMasterFormComponent>;

export const AddNew: Story = {
  name: 'Add New — free text (SOC/ROC image7)',
  args: {},
};

export const ModifyUSDAuto: Story = {
  name: 'Modify — US DOLLAR auto-fills (image10)',
  args: {},
};
