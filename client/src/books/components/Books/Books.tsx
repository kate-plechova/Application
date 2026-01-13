import type { FC } from "react";
import { BookTable } from "../BookTable/BookTable";
import { useSearchQuery } from "../../book.api";
import { BookItem, type Book } from "../BookItem/BookItem";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectIsOnBookmarks } from "../../../user/user.selectors";

export interface BooksProps {
    bookIds?: string[]
}

export const Books: FC<BooksProps> = ({bookIds}) => {

    const onBookmarks = useAppSelector(selectIsOnBookmarks)
    if(bookIds === undefined) return null

    if(bookIds.length === 0){

        if(onBookmarks) {
            return (
                <div
                    className="w-full grow flex justify-center items-center" 
                >Nothing yet...</div>
            )
        }

        return (
            <div
                className="w-full grow flex justify-center items-center" 
            ><FaceFrownIcon className="w-9 h-9" />"Not found</div>
        )
    } 

    return (
        <BookTable>
            {bookIds.map(id => <BookItem key={id} id={id} />)}
        </BookTable>
    )
}