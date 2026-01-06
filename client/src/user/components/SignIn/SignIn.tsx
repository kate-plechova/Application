import type { FC } from "react";
import { useSigninMutation } from "../../user.api";
import { AuthForm } from "../AuthForm/AuthForm";

export const SignIn: FC = () => {

    const [signin, ] = useSigninMutation()

    return (
        <div 
            className="flex flex-col justify-between items-center gap-4"
            data-theme='light'  
        >
            <h1 className="text-xl">Sign In</h1>
            <AuthForm onSubmit={signin} isSignin={true} />
        </div>
    )
}