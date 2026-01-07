import type { FC } from "react";
import { selectUserData } from "../../user.selectors";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { reset } from "../../user.slice";

export const Sidebar: FC = () => {

    const dispatch = useAppDispatch()
    const userData = useAppSelector(selectUserData)

    const username = userData ? userData.username : "Guest"

    return (
        <div className="drawer">
            <input id="drawer-1" type="checkbox" className="drawer-toggle" /> 
            <div className="drawer-content">
                <label htmlFor="drawer-1" className="drawer-button btn">User</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="drawer-1" aria-label="close sidebar" className="drawer-overlay"></label> 
                <div className="w-50 min-h-full text-slate-700 flex flex-col justify-start items-center pt-12 bg-slate-300">
                    <h1>{username}</h1>

                    {userData ? <button 
                        onClick={() => dispatch(reset())}
                        className="btn"
                    >Log out</button> : <button
                        
                    >Sign in</button>}
                    
                </div>
            </div>
        </div>
    )
}