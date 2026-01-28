import { api } from "../api";
import { StatisticsDto } from "./stats.dto";
import { plainToInstance } from 'class-transformer'

export const statsApi = api.injectEndpoints({
    endpoints: builder => ({

        getStats: builder.query<StatisticsDto, void>({
            queryFn: async () => {
                try {
                    const response = await fetch("/statistics.json");
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const json = await response.json();
                    const data = plainToInstance(StatisticsDto, json);
                    return { data };
                }
                catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', error: error instanceof Error ? error.message : 'An unknown error occurred' } };
                }
            }
        })

    })
})

export const {
    useGetStatsQuery
} = statsApi