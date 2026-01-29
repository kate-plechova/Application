import { useEffect } from "react"
import { setData, type UserSlice } from "./user.slice"
import { useAppDispatch } from "../app/hooks"

export const useAutologin = (skip: boolean = false) => {

    const dispatch = useAppDispatch()

    const saveToLocalStorage = (data: UserSlice['data']) => {
        if(data === null) return
        localStorage.setItem('auth', JSON.stringify(data))
    }

    const clear = () => {
        localStorage.removeItem('auth')
    }


    useEffect(() => {
        if(skip) return
        try{
            const stored = localStorage.getItem('auth') 
            if(stored === null || stored === 'null') {
                localStorage.removeItem('auth')
            }
            const data = JSON.parse(stored!) as UserSlice['data']

            dispatch(setData(data))
        }
        catch(error){
            console.error(error)
        }
    }, [])

    return { saveToLocalStorage, clear }
}