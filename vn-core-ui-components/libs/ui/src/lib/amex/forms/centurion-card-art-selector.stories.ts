import type { Meta, StoryObj } from '@storybook/angular';
import { AmexCenturionCardArtSelectorComponent } from './centurion-card-art-selector';
const meta: Meta<AmexCenturionCardArtSelectorComponent> = { title: 'AMEX/Forms/CenturionCardArtSelector', component: AmexCenturionCardArtSelectorComponent, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<AmexCenturionCardArtSelectorComponent>;
export const Default: Story = { name: 'Centurion Living — Select Card Art', args: { title: 'Select Card Art' } };
