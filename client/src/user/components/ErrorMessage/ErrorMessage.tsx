import type { FC } from "react"

export interface ErrorMessageProps {
    code?: number
}

export const ErrorMessage: FC<ErrorMessageProps> = ({code}) => {

    const message = 
        code === undefined ? null
        : code === 409 ? "user already exists"
        : code === 401 ? "wrong username or password"
        : "something went wrong"

    if(message === null){
        return <div className="h-4"/>
    }

    return (
        <div className="h-4 text-red-400">{message}</div>
    )
}