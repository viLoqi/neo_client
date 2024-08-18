import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const DetailsTab = ({ deck_index }: { deck_index: number }) => {
    // const [data, setData] = useState([])

    // useEffect(() => {
    //     const ls = localStorage.getItem(`report:${deck_index}`)
    //     if (ls)
    //         setData(JSON.parse(ls))
    // }, [deck_index])

    const data = [{ name: 'Q0', timeTaken: 1 }, { name: 'Q1', timeTaken: 5 }, { name: 'Q2', timeTaken: 5 }, { name: 'Q3', timeTaken: 1 }, { name: 'Q4', timeTaken: 5 }];

    return (
        <div className="w-full h-full">
            <LineChart width={600} height={300} data={data}>
                <Line type="monotone" dataKey="timeTaken" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis dataKey={"timeTaken"} />
            </LineChart>
        </div>
    )
}

export default DetailsTab;