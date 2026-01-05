import type { Meta, StoryObj } from '@storybook/react-vite';
import { BookItem } from './BookItem';
import { getRandomBookDto } from '../../books.utils';
import { BookTable } from '../BookTable/BookTable';
import { bookDtoToBook } from '../../books.mappers';

const meta = {
  title: 'Books/BookItem',
  component: BookItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BookItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: bookDtoToBook( getRandomBookDto() ),
    decorators: [
        (Story) => (
            <BookTable>
                <Story />
            </BookTable>
        )
    ]
}