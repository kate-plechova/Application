import { useEffect, type FC } from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import { useLazyGetBookmarkedQuery, useLazySearchQuery } from "../../book.api";
import { BookTable } from "../BookTable/BookTable";
import { BookItem } from "../BookItem/BookItem";
import { Books } from "../Books/Books";
import { useAppSelector } from "../../../app/hooks";
import { selectIsOnBookmarks } from "../../../user/user.selectors";
import { useSearchParams } from "react-router";
// import { type SearchParams } from "../SearchForm/SearchForm";

export const BookPage: FC = () => {

    const [params, ] = useSearchParams()

    const [search, {data: searchResult}] = useLazySearchQuery()
    const [getBookmarked, {data: bookmarked}] = useLazyGetBookmarkedQuery()

    const onBookmarks = useAppSelector(selectIsOnBookmarks)

    useEffect(() => {
        if(params.size > 0) 
            search(Object.fromEntries(params))
    }, [params, search])

    useEffect(() => {
        if(onBookmarks){
            getBookmarked()
        }
    }, [onBookmarks]) 

    return (
        <div 
            className="w-full h-full grow flex flex-col justify-between items-center overflow-y-auto"
            // data-theme='light'
        >
            {!onBookmarks && <SearchForm search={search}/>}
            <Books bookIds={onBookmarks ? bookmarked : searchResult}/>
        </div>
    )
}