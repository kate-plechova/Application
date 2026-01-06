import type { FC } from "react";
import { useForm } from "react-hook-form";

export interface Auth {
    username: string
    password: string
}

export interface AuthFormProps {
    onSubmit: (data: Auth) => void
    isSignin: boolean
}

export const AuthForm: FC<AuthFormProps> = ({onSubmit, isSignin}) => {

    const {
        register,
        handleSubmit
    } = useForm<Auth>()

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-between items-center gap-4"
            data-theme="light"
        >
            <input
                type="text"
                placeholder="username"
                className="input"
                {...register('username', { required: true, minLength: 3})}
            />

            <input
                type="password"
                placeholder="password"
                className="input"
                {...register('password', { required: true, minLength: 4})}
            />

            <button 
                type='submit'
                className="btn"
            >{isSignin ? 'Sign in' : 'Sign up'}</button>
        </form>
    )
}