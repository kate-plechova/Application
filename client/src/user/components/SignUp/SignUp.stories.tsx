import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignUp } from './SignUp';
import { withRedux } from '../../../../.storybook/withRedux';

const meta = {
  title: 'User/SignUp',
  component: SignUp,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    decorators: [withRedux]
}