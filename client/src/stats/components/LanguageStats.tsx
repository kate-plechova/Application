import { useMemo, type FC } from "react"
import type { LanguageStatDto } from "../stats.dto"
import { PieChart } from "@mui/x-charts"

export interface LanguageStatsProps {
    data: LanguageStatDto[]
}

export const LangaugeStats: FC<LanguageStatsProps> = ({data}) => {

    const chartData = useMemo(() => {
        
        const major = data.slice(0, 10)
        const minorPercentage = data.slice(10).reduce((acc, item) => acc + item.total_books, 0)

        return [
            {
                data: [
                    ...major.map((item, i) => ({
                        id: i,
                        value: item.total_books,
                        label: item.language_name
                    })).slice(0, 10),
                    {
                        id: major.length,
                        value: minorPercentage,
                        label: "Other"
                    }
                ]
            }
        ]
    }, [data])

    return (
        <div>
            <h2>Language stats</h2>
            <div className="flex flex-row justify-between items-center">

                <div className="overflow-y-auto h-96">
                    <table className="table table-pin-rows">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Total books</th>
                                <th>Translated</th>
                                <th>Translation Percentage</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.language_name}</td>
                                    <td>{item.total_books}</td>
                                    <td>{item.translated_books}</td>
                                    <td>{item.translation_percentage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center items-center">
                    <PieChart
                        series={chartData}
                        width={200}
                        height={200}
                    />
                </div>
                
            </div>
        </div>
    )
}