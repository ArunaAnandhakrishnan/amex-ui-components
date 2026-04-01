import type { Meta, StoryObj } from '@storybook/angular';
import { AmexPortalHomeTilesComponent } from './portal-home-tiles';

const meta: Meta<AmexPortalHomeTilesComponent> = {
  title: 'AMEX/Navigation/PortalHomeTiles',
  component: AmexPortalHomeTilesComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexPortalHomeTilesComponent>;

export const AllTiles: Story = {
  name: 'All 9 tiles enabled',
  args: { portalTitle: 'ONLS Helper Tool' },
};
export const SomeTilesDisabled: Story = {
  name: 'Some tiles disabled',
  args: {
    portalTitle: 'ONLS Helper Tool',
    tiles: [
      { id:'supp',      label:'Supp Access Helper', icon:'🪪', enabled: true },
      { id:'qpay',      label:'QPay Inquiry',        icon:'💳', enabled: false },
      { id:'vat',       label:'VAT Invoice',         icon:'🧾', enabled: true },
      { id:'wallet',    label:'Digital Wallet',      icon:'📱', enabled: true },
      { id:'wearables', label:'Amex Wearables',      icon:'⌚', enabled: true },
      { id:'centurion', label:'Centurion',           icon:'🖤', enabled: false },
      { id:'stmts',     label:'Statements',          icon:'📄', enabled: true },
      { id:'points',    label:'Pay with Points',     icon:'⭐', enabled: true },
      { id:'lounge',    label:'Priority Pass',       icon:'🛫', enabled: true },
    ],
  },
};
