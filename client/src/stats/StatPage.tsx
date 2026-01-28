import { useEffect, useState, type FC } from "react";
import { useGetStatsQuery } from "./stats.api";
import { GeneralStats } from "./components/GeneralStats";
import { SubjectStats } from "./components/SubjectStats";
import { LangaugeStats } from "./components/LanguageStats";
import { FavoriteWorks } from "./components/FavoriteWorks";



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

            <SubjectStats data={data.top_subjects_by_books}/>

            <LangaugeStats data={data.language_stats} />
                        
            <FavoriteWorks data={data.top_works_by_favorites} />

            {/* <p>
                {JSON.stringify(data)}
            </p> */}
        </div>
    )
}