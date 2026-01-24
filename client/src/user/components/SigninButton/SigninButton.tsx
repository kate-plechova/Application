import { useState, useRef, type FC } from "react";
import { SignIn } from "../SignIn/SignIn";
import { SignUp } from "../SignUp/SignUp";
import { UserIcon } from "@heroicons/react/24/outline";

export const SigninButton: FC = () => {

    const [onSignin, setOnSignin] = useState(true)
    const dialogRef = useRef<HTMLDialogElement>(null)

    // const toSignUp = () => {
    //     setOnSignin(false)
    // }

    const toSignIn = () => {
        setOnSignin(true)
    }

    const handleModal = () => {
        dialogRef.current?.showModal()
    }

    const closeModal = () => {
        dialogRef.current?.close()
    }

    return (
        <div className="flex flex-row justify-start items-center">
            {/* <span>Guest</span> */}
            <button className="btn-sm flex flex-row gap-4" onClick={handleModal}><UserIcon className="w-5 h-5"/> Sign in</button>
            <dialog 
                ref={dialogRef}
                id='auth' 
                className="modal" 
            >
                <div className="modal-box">
                    {onSignin ? <SignIn closeModal={closeModal} /> : <SignUp toSignIn={toSignIn}/>}
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