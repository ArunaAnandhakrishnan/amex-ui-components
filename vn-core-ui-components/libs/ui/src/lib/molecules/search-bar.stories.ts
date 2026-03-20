import type { Meta, StoryObj } from '@storybook/angular';
import { SearchBarComponent } from './search-bar';

const meta: Meta<SearchBarComponent> = {
  title: 'Molecules/SearchBar',
  component: SearchBarComponent,
  tags: ['autodocs'],
  argTypes: { placeholder: { control: 'text' }, disabled: { control: 'boolean' } },
};
export default meta;
type Story = StoryObj<SearchBarComponent>;

export const Default: Story = { args: { placeholder: 'Search products...' } };
export const Disabled: Story = { args: { placeholder: 'Search...', disabled: true } };
