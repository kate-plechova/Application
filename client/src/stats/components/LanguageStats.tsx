import type { FC } from "react"
import type { LanguageStatDto } from "../stats.dto"

export interface LanguageStatsProps {
    data: LanguageStatDto[]
}

export const LangaugeStats: FC<LanguageStatsProps> = ({data}) => {
    return (
        <div>
            <h2>Language stats</h2>
            <div className="overflow-y-auto h-96">
                <table className="table table-xs table-pin-rows">
                    <thead>
                        <th>Name</th>
                        <th>Total books</th>
                        <th>Translated</th>
                        <th>Translation Percentage</th>
                    </thead>

                    <tbody>
                        {data.map(item => (
                            <tr>
                                <td>{item.language_name}</td>
                                <td>{item.total_books}</td>
                                <td>{item.translated_books}</td>
                                <td>{item.translation_percentage}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}