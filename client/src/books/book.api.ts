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
        search: builder.query<Book[], SearchParams>({
            query: ({title, author, publisher}) => ({
                url: 'books',
                params: { title, author, publisher },
            }),
            transformResponse: (response: SearchResult): Book[] => {
                return response.books.map(bookDtoToBook);
            },
        })
    })
})

export const {
    useSearchQuery,
    useLazySearchQuery
} = bookApi