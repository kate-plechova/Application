import { api } from "../api";
import type { BookDto } from "./books.dto";
import { bookDtoToBook } from "./books.mappers";
import type { Book } from "./components/BookItem/BookItem";
import type { SearchParams } from "./components/SearchForm/SearchForm";


export interface SearchResult {
    books: BookDto[]
}

export const bookApi = api.injectEndpoints({

    endpoints: (builder) => ({
        
        getBook: builder.query<Book, string>({
            query: (bookId) => ({
                url: `/book/${bookId}`,
                method: "GET"
            }),
            transformResponse: (response: BookDto): Book => {
                return bookDtoToBook(response)
            },
            providesTags: (result, error, bookId) => [{ type: 'Book', id: bookId }]
        }),

        search: builder.query<string[], SearchParams>({
            queryFn: async (arg, { dispatch }, _extraOptions, baseQuery) => {
                try{
                    const result = await baseQuery({
                        url: '/books/search',
                        params: {...arg}
                    })

                    if (result.error) return { error: result.error as any }

                    const data = result.data as SearchResult
                    const books = data.books.map(bookDtoToBook)

                    books.forEach((book) => {
                        dispatch(bookApi.util.upsertQueryData('getBook', book.id, book))
                    })

                    return { data: books.map((book) => book.id) }
                }
                catch(error){
                    console.error(error)
                    return { error: error as any }
                }
            }
        }),

        getBookmarked: builder.query<string[], void>({
            queryFn: async (argon2, { dispatch }, _extraOptions, baseQuery) => {
                const result = await baseQuery({
                    url: '/bookmarks'
                })

                if(result.error) return { error: result.error as any }

                const data = result.data as SearchResult
                const books = data.books.map(bookDtoToBook)

                books.forEach(book => {
                    dispatch(bookApi.util.upsertQueryData('getBook', book.id, book))
                })

                return { data: books.map(book => book.id)}
            },
            // query: () => ({
            //     url: '/bookmarks'
            // }),
            // transformResponse: (response: SearchResult): Book[] => {
            //     return response.books.map(bookDtoToBook)
            // },
            providesTags: ['Bookmarks']
        }),

        getLanguages: builder.query<{[P: string]: string}, void>({
            query: () => ({
                url: '/languages'
            })
        })
    })
})

export const {
    useGetBookQuery,
    useLazyGetBookQuery,
    useSearchQuery,
    useLazySearchQuery,
    useLazyGetBookmarkedQuery,

    useGetLanguagesQuery
} = bookApi