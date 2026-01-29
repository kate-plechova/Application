import type { FC } from "react";
import { Books } from "../../books/components/Books/Books";
import { useGetBookmarkedQuery } from "../../books/book.api";

export const Bookmarks: FC = () => {

    const { data: bookmarked } = useGetBookmarkedQuery()

    return (
        <Books bookIds={bookmarked}/>
    )
}