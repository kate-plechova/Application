import type { FC } from "react";
import { AuthForm } from "../AuthForm/AuthForm";
import { useSignupMutation } from "../../user.api";

export const SignUp: FC = () => {

    const [signup, ] = useSignupMutation()

    return (
        <div
            className="flex flex-col justify-between items-center gap-4"
            data-theme='light' 
        >
            <h1 className="text-xl">Sign Up</h1>
            <AuthForm onSubmit={signup} isSignin={false} />
        </div>
    )
}