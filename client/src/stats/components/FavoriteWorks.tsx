import type { FC } from "react";
import type { FavoriteWorkDto } from "../stats.dto";

export interface FavoriteWorksProps {
    data: FavoriteWorkDto[]
}

export const FavoriteWorks: FC<FavoriteWorksProps> = ({data}) => {
    return (
        <div>
            <h2>Favorite works</h2>
            <div className="overflow-y-auto h-96">
                <table className="table table-xs table-pin-rows">
                    <thead>
                        <th>Title</th>
                        <th>Count</th>
                    </thead>

                    <tbody>
                        {data.map(item => (
                            <tr>
                                <td>{item.title}</td>
                                <td>{item.favorite_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}