import { useMemo, type FC } from "react";
import type { SubjectStatDto } from "../stats.dto";
import { PieChart } from '@mui/x-charts'

export interface SubjectStatsProps {
    data: SubjectStatDto[]
}

export const SubjectStats: FC<SubjectStatsProps> = ({data}) => {

    const chartData = useMemo(() => [
        {
            data: 
                data.map((item, i) => ({
                    id: i,
                    value: item.book_count,
                    label: item.name
                }))
            
        }
    ], [data])

    return (
        <div>
            <h2>Subject Statistics</h2>
            <PieChart
                series={chartData} 
                width={200}
                height={200}
            />
        </div>
    )
}