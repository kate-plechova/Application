import type { FC, PropsWithChildren } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectUserData } from "../../../user/user.selectors";

export const BookTable: FC<PropsWithChildren> = ({children}) => {

    const userData = useAppSelector(selectUserData)

    return (
        <table className="table">
            <thead className="text-slate-600">
                <tr>
                    {userData && <th />}
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