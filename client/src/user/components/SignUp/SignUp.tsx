import type { FC } from "react";
import { AuthForm, type Auth } from "../AuthForm/AuthForm";
import { useSignupMutation } from "../../user.api";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export interface SignupProps {
    toSignIn: () => void
}

export const SignUp: FC<SignupProps> = ({toSignIn}) => {

    const [signup, { error }] = useSignupMutation()

    const handleSignup = async (data: Auth) => {
        try {
            await signup(data).unwrap()
            toSignIn()
        } catch (err) {
            console.error('Signup failed', err)
        }
    }

    return (
        <div
            className="flex flex-col justify-between items-center gap-4"
            // data-theme='light' 
        >
            <h1 className="text-xl">Sign Up</h1>
            <AuthForm onSubmit={handleSignup} isSignin={false} />
            <ErrorMessage code={(error as any)?.status} />
        </div>
    )
}