import { useEffect, useState, type FC } from "react";
import { useGetStatsQuery } from "./stats.api";
import { GeneralStats } from "./components/GeneralStats";
import { SubjectStats } from "./components/SubjectStats";
import { LangaugeStats } from "./components/LanguageStats";
import { FavoriteWorks } from "./components/FavoriteWorks";
import { Section } from "./components/Section";



export const StatPage: FC = () => {

    const { data, isLoading, isError, error } = useGetStatsQuery()

    if(isLoading){
        return <div>Loading...</div>
    }

    if(isError || !data){
        return <div>{JSON.stringify(error)}</div>
    }
    return (
        <div
            data-theme="light" 
            className="w-full flex flex-col justify-start items-center gap-6"
        >
            <GeneralStats {...data.general_stats} /> 

            <Section
                title="Subject stats"
                data={data.top_subjects_by_books}
                table={{
                    columns: ["name", "book_count"]
                }}
                chart={{
                    majorCount: 10,
                    getLabelValue: item => ({label: item.name, value: item.book_count})
                }}
            />

            <Section
                title="Language stats"
                data={data.language_stats}
                table={{
                    columns: ["language_name", "total_books", "translated_books", "translation_percentage"]
                }}
                chart={{
                    majorCount: 10,
                    getLabelValue: item => ({label: item.language_name, value: item.total_books})
                }}
            />
                        
            <Section
                title="Favorite works"
                data={data.top_works_by_favorites}
                table={{
                    columns: ["title", "favorite_count"]
                }}
            />

        </div>
    )
}