import type { FC } from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import { useLazySearchQuery } from "../../book.api";
import { BookTable } from "../BookTable/BookTable";
import { BookItem } from "../BookItem/BookItem";
import { Books } from "../Books/Books";

export const BookPage: FC = () => {

    const [search, {data}] = useLazySearchQuery()

    return (
        <div 
            className="w-full h-full grow justify-center items-center"
            // data-theme='light'
        >
            <SearchForm search={search}/>
            <Books books={data}/>
        </div>
    )
}