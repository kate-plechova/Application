import type { FC } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectUserData } from "../../user.selectors";
import { SignIn } from "../SignIn/SignIn";
import { Sidebar } from "../Sidebar/Sidebar";
import { SigninButton } from "../SigninButton/SigninButton";

export const Header: FC = () => {

    const userData = useAppSelector(selectUserData)

    const showModal = () => {
        const dialog = document.getElementById("auth") as HTMLDialogElement | null
        if(dialog){
            dialog.showModal()
        }
        
    }

    return (
        <header
            // data-theme='light' 
            className="w-full h-11 flex flex-row justify-between items-center bg-emerald-300 z-50 relative"
        >
            <div className="flex-none">
                {userData ? <div>dude</div> : <SigninButton />}
            </div>
            <div className="grow w-1" />

            <ul
                className="flex flex-row justify-start items-center gap-4 text-slate-200" 
            >
                <li><a>Mail</a></li>
                <li><a href="https://github.com/kate-plechova/Application/tree/main">Github</a></li>
            </ul>
        </header>
    )
}