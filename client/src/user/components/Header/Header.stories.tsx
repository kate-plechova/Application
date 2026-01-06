import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';
import { withRedux } from '../../../../.storybook/withRedux';

const meta = {
  title: 'User/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  decorators: [withRedux],
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotAuth: Story = {}