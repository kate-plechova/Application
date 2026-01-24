import { useEffect, type FC } from "react";
import dayjs from "dayjs";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { useRemoveBookmarkMutation, useSaveBookmarkMutation } from "../../../user/user.api";
import { useGetBookQuery, useLazyGetBookQuery } from "../../book.api";
import { useAppSelector } from "../../../app/hooks";
import { selectIsOnBookmarks, selectUserData } from "../../../user/user.selectors";

export interface Book {
    id: string
    title: string;
    author: string;
    translations: string[];
    publisher: string;
    publishDate: string;
    rating: number;
    isBookmarked?: boolean
}

export interface BookItemProps {
    id: string
}

export const BookItem: FC<BookItemProps /*Book*/> = ({ 
    id,
    // title, 
    // author, 
    // translations, 
    // publisher,
    // publishDate,
    // rating,
    // isBookmarked
}) => {

    const onBookmarks = useAppSelector(selectIsOnBookmarks)
    const userData = useAppSelector(selectUserData)
    const { data: book, isLoading } = useGetBookQuery(id)
    // const [getBook, { data: book}] = useLazyGetBookQuery()
    const [saveBookmark, ] = useSaveBookmarkMutation()
    const [removeBookmark, ] = useRemoveBookmarkMutation()

    // useEffect(() => {
    //     getBook(id)
    // }, [onBookmarks])

    const handleBookmarkStatusChange = () => {
        if(!book || book.isBookmarked === undefined) {
            throw new Error(`something wrong: ${JSON.stringify(book)}`)
        }
        console.log('click')
        if(book.isBookmarked === true){
            removeBookmark(id)
        }
        else if(book.isBookmarked === false){
            saveBookmark(id)
        }
    }

    if( !book || isLoading ){
        return <div>Loading...</div>
    }

    return (
        <tr className="text-slate-700">
            {userData && (
                <td>
                    <BookmarkIcon 
                        style={{
                            color: book.isBookmarked ? "yellow" : "black"
                        }}
                        // className={`${book.isBookmarked ? "text-yellow-300" : "text-slate-400"}`}
                        className="size-6"
                        onClick={handleBookmarkStatusChange}
                    />
                </td>
            )}
            <th>{book.author}</th>
            <td>
                <div className="flex flex-col justify-between items-start">
                    <span>{book.title}</span>
                    <div className="grid grid-cols-6 gap-2">
                        {book.translations.map(tr => <div key={tr} className="badge badge-sm">{tr}</div>)}
                    </div>
                </div>
            </td>
            <td>{book.publisher}</td>
            <td>{book.publishDate}</td>
            <td>{book.rating}</td>
        </tr>
    )
}