import { PieChart } from "@mui/x-charts"
import { useMemo } from "react"

export interface SectionProps<T extends object> {
    title: string
    data: T[]
    table: {
        columns: (keyof T)[]
    }
    chart?: {
        majorCount: number
        getLabelValue: (item: T) => {label: string, value: number}
    }
}

export const Section = <T extends object>({title, data, table, chart}: SectionProps<T>) => {

    const chartData = useMemo(() => {
        if(!chart){
            return []
        }
        const major = data.slice(0, chart.majorCount)
        const minorPercentage = data.slice(chart.majorCount).reduce((acc, item) => acc + item.book_count, 0)
        return [
        {
            data: [
                ...major
                .map(chart.getLabelValue)
                .map(({label, value}, i) => ({id: i, value, label})),
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
        <div className="w-[90%] grid grid-cols-2 gap-7">

            <div className="col-span-2 flex justify-center items-center">
                <h2 className="font-medium text-3xl">{title}</h2>
            </div>

            <div className="overflow-y-auto h-96">
                <table className="table table-pin-rows">
                    <thead>
                        <tr>
                            {table.columns.map(col => (
                                <th>{col.toString()}</th>
                            ))}
                        </tr>
                    </thead> 
                    <tbody>
                        {data.map(item => (
                            <tr>
                                {table.columns.map(col => (
                                    <td>{`${item[col]}`}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                {chart && <PieChart
                    series={chartData} 
                    width={200}
                    height={200}
                />}

            </div>
        </div>
    )
}