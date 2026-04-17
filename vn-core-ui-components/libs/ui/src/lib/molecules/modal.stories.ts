import type { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from './modal';
import { ButtonComponent } from '../atoms/button';

const meta: Meta<ModalComponent> = {
  title: 'Molecules/Modal',
  component: ModalComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'focus-management', 'keyboard-navigation', 'screen-reader'],
  argTypes: { size: { control: 'radio', options: ['sm','md','lg'] } },
};
export default meta;
type Story = StoryObj<ModalComponent>;

export const Default: Story = {
  args: { open: true, title: 'Confirm Action', size: 'md' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ButtonComponent] },
    template: `
      <ui-modal [open]="open" [title]="title" [size]="size" [hasFooter]="true">
        Are you sure you want to delete this item? This action cannot be undone.
        <div slot="footer">
          <ui-button label="Cancel" variant="secondary" size="sm"></ui-button>
          <ui-button label="Delete" variant="primary" size="sm"></ui-button>
        </div>
      </ui-modal>`,
  }),
};

export const Large: Story = {
  args: { open: true, title: 'Terms of Service', size: 'lg' },
  render: (args) => ({
    props: args,
    template: `<ui-modal [open]="open" [title]="title" [size]="size">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</ui-modal>`,
  }),
};
