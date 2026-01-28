import { useEffect, useState, type FC } from "react";
import { useGetStatsQuery } from "./stats.api";
import { GeneralStats } from "./components/GeneralStats";



export const StatPage: FC = () => {

    const { data, isLoading, isError, error } = useGetStatsQuery()

    if(isLoading){
        return <div>Loading...</div>
    }

    if(isError || !data){
        return <div>{JSON.stringify(error)}</div>
    }
    return (
        <div>
            <h2>General stats</h2>
            <GeneralStats {...data.general_stats} /> 

            <p>
                {JSON.stringify(data)}
            </p>
        </div>
    )
}