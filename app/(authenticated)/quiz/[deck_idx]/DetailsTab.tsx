import { Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ZAxis, CartesianGrid, XAxis, YAxis, Tooltip, Scatter, ScatterChart, Label, Legend, ComposedChart, AreaChart, Area } from 'recharts';

const DetailsTab = ({ deck_index }: { deck_index: number }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const ls = localStorage.getItem(`report:${deck_index}`)
        if (ls)
            setData(JSON.parse(ls))
    }, [deck_index])

    // const data = [{ qid: 0, timeTaken: 100, attemptDate: "TEST" }, { qid: 0, timeTaken: 200, aid: "TEST" }]
    return (
        <div className="w-full h-full flex gap-4 flex-col">
            <Heading>Time Taken Across Attempts</Heading>
            <ScatterChart width={600} height={400}  >
                <Scatter type="monotone" dataKey="timeTaken" fill="#82ca9d" data={data} />
                <CartesianGrid strokeDasharray="3 3" />

                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <XAxis dataKey="qid" type='category' allowDuplicatedCategory={false}>
                    <Label value="Question" offset={0} position="insideBottom" />

                </XAxis>
                <YAxis dataKey="timeTaken" unit={"s"}>
                    <Label value="Time Taken" angle={-90} position="left" offset={0} />
                </YAxis>
                <ZAxis dataKey="attemptDate" >
                </ZAxis>
            </ScatterChart>
        </div >
    )
}

export default DetailsTab;