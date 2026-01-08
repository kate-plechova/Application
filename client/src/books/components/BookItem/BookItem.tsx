import type { FC } from "react";
import dayjs from "dayjs";
import { BookmarkIcon } from "@heroicons/react/24/outline";

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

export const BookItem: FC<Book> = ({ 
    title, 
    author, 
    translations, 
    publisher,
    publishDate,
    rating,
    isBookmarked
}) => {
    return (
        <tr className="text-slate-700">
            {isBookmarked !== undefined && <td><BookmarkIcon className={`${isBookmarked ? "text-yellow-300" : "text-slate-400"}`}/></td>}
            <th>{author}</th>
            <td>
                <div className="flex flex-col justify-between items-start">
                    <span>{title}</span>
                    <div className="grid grid-cols-6 gap-2">
                        {translations.map(tr => <div key={tr} className="badge badge-sm">{tr}</div>)}
                    </div>
                </div>
            </td>
            <td>{publisher}</td>
            <td>{publishDate}</td>
            <td>{rating}</td>
        </tr>
    )
}