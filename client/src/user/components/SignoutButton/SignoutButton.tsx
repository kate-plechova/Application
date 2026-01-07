import type { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectUserData } from "../../user.selectors";
import { reset } from "../../user.slice";

export const SignoutButton: FC = () => {

    const dispatch = useAppDispatch()
    const userData = useAppSelector(selectUserData)
    if(!userData) return null

    return (
        <div>
            <span>{userData.username}</span>
            <button onClick={() => dispatch(reset())} className="btn">Sign out</button>
        </div>
    )
}