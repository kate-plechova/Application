import type { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectIsOnBookmarks, selectUserData } from "../../user.selectors";
import { SignIn } from "../SignIn/SignIn";
import { Sidebar } from "../Sidebar/Sidebar";
import { SigninButton } from "../SigninButton/SigninButton";
import { ArrowLeftIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { reset, showBookmarks } from "../../user.slice";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

const email = "kate.plechova@gmail.com"

export const Header: FC = () => {

    const dispatch = useAppDispatch()
    const userData = useAppSelector(selectUserData)
    const onBookmarks = useAppSelector(selectIsOnBookmarks)

    const showModal = () => {
        const dialog = document.getElementById("auth") as HTMLDialogElement | null
        if(dialog){
            dialog.showModal()
        }
        
    }

    return (
        <header
            className="w-full h-11 flex flex-row justify-between items-center bg-emerald-300 z-50 relative px-3"
        >
            <div className="flex-none">
                { onBookmarks ? (
                    <button
                        onClick={() => dispatch(showBookmarks(false))} 
                    >
                        <ArrowLeftIcon className="size-5" />
                    </button>
                ) 
                : userData ? (
                    <div className="flex flex-row items-center gap-3">
                        <button
                            onClick={() => dispatch(showBookmarks(true))} 
                        >
                            <BookmarkIcon className="w-5 h-5" />
                        </button>
                        <div>{userData.username}</div> 
                        <button
                            onClick={() => dispatch(reset())}     
                        >
                            <ArrowLeftStartOnRectangleIcon className="size-5" />
                        </button>
                    </div>
                ) : <SigninButton />}
            </div>
            <div className="grow w-1" />

            <ul
                className="flex flex-row justify-start items-center gap-4 text-slate-800" 
            >
                {/* <li><a href={`mailto:${email}`}>{email}</a></li>
                <li><a href="https://github.com/kate-plechova/Application/tree/main">Github</a></li> */}
                <li>MathBook Search</li>
            </ul>
        </header>
    )
}