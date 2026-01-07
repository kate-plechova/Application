import type { FC } from "react";
import { useSigninMutation } from "../../user.api";
import { AuthForm } from "../AuthForm/AuthForm";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export const SignIn: FC = () => {

    const [signin, {error}] = useSigninMutation()

    return (
        <div 
            className="flex flex-col justify-between items-center gap-4"
            // data-theme='light'  
        >
            <h1 className="text-xl">Sign In</h1>
            <AuthForm onSubmit={signin} isSignin={true} />
            <ErrorMessage code={(error as any)?.status} />
        </div>
    )
}