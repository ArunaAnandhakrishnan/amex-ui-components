import type { Meta, StoryObj } from '@storybook/angular';
import { FileUploadComponent } from './file-upload';

const meta: Meta<FileUploadComponent> = {
  title: 'Molecules/FileUpload',
  component: FileUploadComponent,
  tags: ['autodocs'],
  argTypes: { multiple: { control: 'boolean' }, disabled: { control: 'boolean' } },
};
export default meta;
type Story = StoryObj<FileUploadComponent>;

export const Default: Story = { args: { hint: 'PNG, JPG, PDF up to 10MB' } };
export const MultipleFiles: Story = { args: { multiple: true, hint: 'Select multiple files' } };
export const ImagesOnly: Story = { args: { accept: 'image/*', hint: 'Images only' } };
export const Disabled: Story = { args: { disabled: true } };
