import type { FC } from "react";
import { useSigninMutation } from "../../user.api";
import { AuthForm, type Auth } from "../AuthForm/AuthForm";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { useAppDispatch } from "../../../app/hooks";
import { setData } from "../../user.slice";

export interface SignInProps {
    closeModal: () => void
}

export const SignIn: FC<SignInProps> = ({closeModal}) => {

    const dispatch = useAppDispatch()
    const [signin, {error}] = useSigninMutation()

    const handleSignin = async (data: Auth) => {
        try {
            const res = await signin(data).unwrap()
            dispatch(setData(res))
            closeModal()
        } catch (err) {
            console.error('Signin failed', err)
        }
    }

    return (
        <div 
            className="flex flex-col justify-between items-center gap-4"
            // data-theme='light'  
        >
            <h1 className="text-xl">Sign In</h1>
            <AuthForm onSubmit={handleSignin} isSignin={true} />
            <ErrorMessage code={(error as any)?.status} />
        </div>
    )
}