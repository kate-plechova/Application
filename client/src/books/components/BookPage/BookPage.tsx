import type { FC } from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import { useLazySearchQuery } from "../../book.api";
import { BookTable } from "../BookTable/BookTable";
import { BookItem } from "../BookItem/BookItem";

export const BookPage: FC = () => {

    const [, {data}] = useLazySearchQuery()

    return (
        <div className="w-full h-full">
            <SearchForm />

            {data ? (
                <BookTable>
                    {data.map(item => <BookItem key={item.id} {...item}/>)}
                </BookTable>

            )
            : (
                <div>No data</div>
            )            
            }
        </div>
    )
}