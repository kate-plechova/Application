import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchForm } from './SearchForm';
import { withRedux } from '../../../../.storybook/withRedux'
import { http, HttpResponse } from 'msw'


const meta = {
  title: 'Books/SearchForm',
  component: SearchForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    decorators: [withRedux],
    parameters: {
        msw: {
            handlers: [
                http.get(`${import.meta.env.VITE_API_URL}/books`, ({request}) => {
                    const url = new URL(request.url)
                    const title = url.searchParams.get('title')
                    const author = url.searchParams.get('author')
                    console.log('title', title, 'author', author)
                    return HttpResponse.json({books: []})
                })
            ]
        }
    }
}