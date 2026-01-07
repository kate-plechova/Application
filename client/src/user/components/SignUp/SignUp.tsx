import type { FC } from "react";
import { AuthForm } from "../AuthForm/AuthForm";
import { useSignupMutation } from "../../user.api";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export const SignUp: FC = () => {

    const [signup, { error }] = useSignupMutation()

    return (
        <div
            className="flex flex-col justify-between items-center gap-4"
            // data-theme='light' 
        >
            <h1 className="text-xl">Sign Up</h1>
            <AuthForm onSubmit={signup} isSignin={false} />
            <ErrorMessage code={(error as any)?.status} />
        </div>
    )
}