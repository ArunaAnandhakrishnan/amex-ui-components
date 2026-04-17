import type { Meta, StoryObj } from '@storybook/angular';
import { PaginationComponent } from './pagination';

const meta: Meta<PaginationComponent> = {
  title: 'Atoms/Pagination',
  component: PaginationComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'keyboard-navigation', 'screen-reader'],
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
    pageChange: { action: 'pageChange' },
  },
};
export default meta;
type Story = StoryObj<PaginationComponent>;

export const Default: Story = { args: { currentPage: 1, totalPages: 10 } };
export const MiddlePage: Story = { args: { currentPage: 5, totalPages: 10 } };
export const FewPages: Story = { args: { currentPage: 2, totalPages: 4 } };
