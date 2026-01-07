import type { FC } from "react";
import { BookTable } from "../BookTable/BookTable";
import { useSearchQuery } from "../../book.api";
import { BookItem, type Book } from "../BookItem/BookItem";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export interface BooksProps {
    books?: Book[]
}

export const Books: FC<BooksProps> = ({books}) => {

    if(books === undefined) return null

    if(books.length === 0){
        return (
            <div
                className="w-full h-full flex justify-center items-center" 
            ><FaceFrownIcon className="w-9 h-9" />"Not found</div>
        )
    } 

    return (
        <BookTable>
            {books.map(book => <BookItem key={book.id} {...book} />)}
        </BookTable>
    )
}