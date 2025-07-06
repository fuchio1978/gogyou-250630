import type { Meta, StoryObj } from '@storybook/react';
import FiveChart from '../src/components/FiveChart';
import { defaultValues } from '../src/lib/calc';

const meta: Meta<typeof FiveChart> = {
  title: '五行バランス/FiveChart',
  component: FiveChart,
};
export default meta;

type Story = StoryObj<typeof FiveChart>;

export const Default: Story = {
  args: {
    value: { ...defaultValues, wood: 10, fire: 8, earth: 4, metal: 2, water: 6 },
  },
};
