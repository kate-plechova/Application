import type { Meta, StoryObj } from '@storybook/react-vite';
import { App } from "./App"
import { withRedux } from '../.storybook/withRedux';
import { http, HttpResponse } from 'msw';
import { getRandomBookDto } from './books/books.utils';
import type { SearchResult } from './books/book.api';
import type { Auth } from './user/components/AuthForm/AuthForm';

const meta = {
  title: 'App/App',
  component: App,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseUrl = import.meta.env.VITE_API_URL

export const Primary: Story = {
    decorators: [
        withRedux,
        (Story) => (
            <div className='w-[700px] h-125'>
                <Story />
            </div>
        )
    ],
    parameters: {
        msw: {

            handlers: [
                http.get(`${baseUrl}/books`, ({request}) => {

                    const url = new URL(request.url)   
                    const title = url.searchParams.get("title")
                    if(title && title === 'book'){
                        return HttpResponse.json({books: []})
                    }

                    const books = [ getRandomBookDto() ]
                    const res: SearchResult = { books }
                    return HttpResponse.json(res)
                }),

                http.post(`${baseUrl}/signup`, async ({request}) => {
                    const req = await request.json() as Auth
                    console.log(req)
                    if(req.username === 'dude'){
                        return new HttpResponse(null, { status: 409})
                    }
                    return new HttpResponse(null, { status: 200})
                }),

                http.post(`${baseUrl}/signin`, async ({request}) => {
                    const req = await request.json() as Auth
                    console.log(req)
                    return new HttpResponse(null, { status: 200})
                })
            ]
        }
    }
}

