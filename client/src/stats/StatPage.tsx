import { useEffect, useState, type FC } from "react";
import { useGetStatsQuery } from "./stats.api";



export const StatPage: FC = () => {

    const { data, isLoading, isError, error } = useGetStatsQuery()

    if(isLoading){
        return <div>Loading...</div>
    }

    if(isError){
        return <div>{JSON.stringify(error)}</div>
    }
    return <div>{JSON.stringify(data)}</div>
}