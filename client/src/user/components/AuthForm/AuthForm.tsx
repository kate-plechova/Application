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
        handleSubmit,
        formState: { errors }
    } = useForm<Auth>()

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-between items-center gap-4"
            // data-theme="light"
        >
            <input
                type="text"
                placeholder="username"
                className="input"
                {...register('username', { required: "Username is required", minLength: { value: 3, message: "Username must be at least 3 characters" } })}
            />
            {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}

            <input
                type="password"
                placeholder="password"
                className="input"
                {...register('password', { required: "Password is required", minLength: { value: 4, message: "Password must be at least 4 characters" } })}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

            <button 
                type='submit'
                className="btn"
            >{isSignin ? 'Sign in' : 'Sign up'}</button>
        </form>
    )
}