import { useEffect, type FC } from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import { useLazyGetBookmarkedQuery, useLazySearchQuery } from "../../book.api";
import { BookTable } from "../BookTable/BookTable";
import { BookItem } from "../BookItem/BookItem";
import { Books } from "../Books/Books";
import { useAppSelector } from "../../../app/hooks";
import { selectIsOnBookmarks } from "../../../user/user.selectors";

export const BookPage: FC = () => {

    const [search, {data: searchResult}] = useLazySearchQuery()
    const [getBookmarked, {data: bookmarked}] = useLazyGetBookmarkedQuery()

    const onBookmarks = useAppSelector(selectIsOnBookmarks)

    useEffect(() => {
        if(onBookmarks){
            getBookmarked()
        }
    }, [onBookmarks]) 

    return (
        <div 
            className="w-full grow flex flex-col items-center overflow-y-auto"
            // data-theme='light'
        >
            {!onBookmarks && <SearchForm search={search}/>}
            <Books bookIds={onBookmarks ? bookmarked : searchResult}/>
        </div>
    )
}