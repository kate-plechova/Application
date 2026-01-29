import type { FC } from "react";
import { Outlet } from "react-router";
import { Header } from "../user/components/Header/Header";
import { useAutologin } from "../user/autoLogHook";

export const MainLayout: FC = () => {

    useAutologin()

    return (
        <div 
            className="w-full h-full p-0 m-0 flex flex-col justify-center items-stretch"
            data-theme="light"
        >
            <Header />
            <div className="grow w-full h-screen">
                <div className="w-full h-full overflow-y-auto pt-10">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}