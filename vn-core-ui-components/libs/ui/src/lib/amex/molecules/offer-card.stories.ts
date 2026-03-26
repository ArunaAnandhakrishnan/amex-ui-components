import type { Meta, StoryObj } from '@storybook/angular';
import { AmexOfferCardComponent } from './offer-card';

const meta: Meta<AmexOfferCardComponent> = {
  title: 'AMEX/Molecules/OfferCard',
  component: AmexOfferCardComponent,
  tags: ['autodocs'],
  argTypes: {
    enroll:   { action: 'enroll' },
    unenroll: { action: 'unenroll' },
  },
  decorators: [
    (story) => ({ ...story(), template: `<div style="width:320px">${story().template}</div>` }),
  ],
};
export default meta;
type Story = StoryObj<AmexOfferCardComponent>;

export const Available: Story = {
  args: { offer: { id: '1', title: '20% cashback on dining', description: 'Earn 20% back at participating UAE restaurants.', category: 'Dining', merchant: 'Various Restaurants', validUntil: '30 Apr 2024', eligibleCards: ['gold', 'platinum'], enrolled: false } },
};
export const Enrolled: Story = {
  args: { offer: { id: '2', title: '5x points on travel bookings', description: 'Earn 5x Membership Rewards on all airline and hotel bookings.', category: 'Travel', merchant: 'Emirates & Marriott', validUntil: '31 May 2024', eligibleCards: ['centurion', 'platinum'], enrolled: true } },
};