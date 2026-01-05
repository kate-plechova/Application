import type { FC, PropsWithChildren } from "react";

export const BookTable: FC<PropsWithChildren> = ({children}) => {
    return (
        <table className="table">
            <thead className="text-slate-600">
                <tr>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Publisher</th>
                    <th>Publish Date</th> 
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}