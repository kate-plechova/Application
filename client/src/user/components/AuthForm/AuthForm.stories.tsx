import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthForm } from './AuthForm';

const meta = {
  title: 'User/AuthForm',
  component: AuthForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AuthForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        onSubmit: (data) => { console.log(data)},
        isSignin: true
    }
}
