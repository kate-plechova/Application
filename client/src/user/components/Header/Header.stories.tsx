import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';
import { withRedux } from '../../../../.storybook/withRedux';
import { v4 } from 'uuid';
import type { RootState } from '../../../app/store';

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

export const WithAuth: Story = {
    parameters: {
        redux: {
            user: {
                data: {
                    id: v4(),
                    username: "Kate",
                    token: "some token"
                }
            }
        } satisfies Omit<RootState, "api">
    }
}