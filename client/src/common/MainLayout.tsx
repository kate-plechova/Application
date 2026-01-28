import type { FC } from "react";
import { Outlet } from "react-router";
import { Header } from "../user/components/Header/Header";

export const MainLayout: FC = () => {
    return (
        <div 
            className="w-full h-full flex flex-col justify-between items-stretch"
            data-theme="light"
        >
            <Header />
            <div className="grow w-full h-full">
                <Outlet />
            </div>
        </div>
    )
}