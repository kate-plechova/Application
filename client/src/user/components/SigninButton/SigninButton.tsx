import { useState, type FC } from "react";
import { SignIn } from "../SignIn/SignIn";
import { SignUp } from "../SignUp/SignUp";

export const SigninButton: FC = () => {

    const [onSignin, setOnSignin] = useState(true)

    const handleModal = () => {
        const dialog = document.getElementById("auth") as HTMLDialogElement | null
        if(dialog){
            dialog.showModal()
        }
    
    }

    return (
        <div>
            <span>Guest</span>
            <button className="btn btn-outline" onClick={handleModal}>Sign in</button>
            <dialog 
                id='auth' 
                className="modal" 
                // data-theme='light'
            >
                <div className="modal-box">
                    {onSignin ? <SignIn /> : <SignUp />}
                    <button
                        className="btn btn-outline"
                        onClick={() => setOnSignin(i => !i)}
                    >{onSignin ? 'Sign up' : 'Sign in'}</button>
                    
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div> 
    )
}