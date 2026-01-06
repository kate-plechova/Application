import type { FC } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectUserData } from "../../user.selectors";

export const Header: FC = () => {

    const userData = useAppSelector(selectUserData)

    return (
        <header
            data-theme='light' 
            className="w-full h-11 flex flex-row justify-between items-center bg-emerald-300"
        >
            {userData ? (
                <span>{userData.username}</span>
            ) : (
                <button>Sign in</button>
            )}

            <ul
                className="flex flex-row justify-start items-center gap-4" 
            >
                <li><a>Mail</a></li>
                <li><a href="https://github.com/kate-plechova/Application/tree/main">Github</a></li>
            </ul>
        </header>
    )
}