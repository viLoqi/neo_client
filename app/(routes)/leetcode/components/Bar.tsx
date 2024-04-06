import React from "react";
import { AxisOptions, Chart } from "react-charts";

import { Problem } from "@/app/_types/leetcode";

type Series = {
    label: string,
    data: Problem[]
}

export default function Bar({ data }: Readonly<{ data: Series[] }>) {


    const primaryAxis = React.useMemo(
        (): AxisOptions<Problem> => ({
            getValue: datum => datum.name,
        }),
        []
    )

    const secondaryAxes = React.useMemo(
        (): AxisOptions<Problem>[] => [
            {
                getValue: datum => 1,
                stacked: true
            },
        ],
        []
    )

    return (
        <Chart
            options={{
                data,
                primaryAxis,
                secondaryAxes,
                dark: true
            }}
        />
    );
}
