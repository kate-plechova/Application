import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignIn } from './SignIn';
import { withRedux } from '../../../../.storybook/withRedux';

const meta = {
  title: 'User/SignIn',
  component: SignIn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignIn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    decorators: [withRedux]
}