import type { FC } from "react";
import type { GeneralStatsDto } from "../stats.dto";

export const GeneralStats: FC<GeneralStatsDto> = (dto) => {
    return (
        <div className="w-[60%] flex flex-col justify-start items-center">
            <h2 className="text-4xl font-medium">General Stats</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <th>Total books</th>
                        <td>{dto.total_books}</td>
                    </tr>

                    <tr>
                        <th>Total authors</th>
                        <td>{dto.total_authors}</td>
                    </tr>

                    <tr>
                        <th>Total languages</th>
                        <td>{dto.total_languages}</td>
                    </tr>

                    <tr>
                        <th>Total subjects</th>
                        <td>{dto.total_subjects}</td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}