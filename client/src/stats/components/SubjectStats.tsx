import { useMemo, type FC } from "react";
import type { SubjectStatDto } from "../stats.dto";
import { PieChart } from '@mui/x-charts'

export interface SubjectStatsProps {
    data: SubjectStatDto[]
}

export const SubjectStats: FC<SubjectStatsProps> = ({data}) => {

    const chartData = useMemo(() => {
        const major = data.slice(0, 10)
        const minorPercentage = data.slice(10).reduce((acc, item) => acc + item.book_count, 0)
        return [
        {
            data: [
                ...major.map((item, i) => ({
                    id: i,
                    value: item.book_count,
                    label: item.name
                })),
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
            <h2>Subject Statistics</h2>
            <div className="flex flex-row justify-between items-center">

                <div className="overflow-y-auto h-96">
                    <table className="table table-pin-rows">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Total books</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.name}</td>
                                    <td>{item.book_count}</td>
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