import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Chart } from "../../components";


const flows = [
    {
        id: "1",
        name: "Welcome Email Campaign",
        nodes: [],
        edges: [],
        status: "completed",
        totalJobs: 10,
        completedJobs: 10,
        failedJobs: 0,
    },
    {
        id: "2",
        name: "Welcome Email Campaign",
        nodes: [],
        edges: [],
        status: "scheduled",
        totalJobs: 10,
        completedJobs: 1,
        failedJobs: 2,
    },
    {
        id: "3",
        name: "Welcome Email Campaign",
        nodes: [],
        edges: [],
        status: "failed",
        totalJobs: 10,
        completedJobs: 0,
        failedJobs: 10,
    },
    {
        id: "4",
        name: "Welcome Email Campaign",
        nodes: [],
        edges: [],
        status: "partial",
        totalJobs: 10,
        completedJobs: 5,
        failedJobs: 5,
    },
];


const Analytics = () => {
    const navigate = useNavigate();

    const [barChartOptions, setBarChartOptions] = useState({
        data: [
            { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
            { month: 'Feb', avgTemp: 2.3, iceCreamSales: 162000 },
            { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
            { month: 'Apr', avgTemp: 6.3, iceCreamSales: 302000 },
            { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
            { month: 'Jun', avgTemp: 16.2, iceCreamSales: 800000 },
            { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
            { month: 'Aug', avgTemp: 22.8, iceCreamSales: 1254000 },
            { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
            { month: 'Oct', avgTemp: 8.9, iceCreamSales: 200000 },
            { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
            { month: 'Dec', avgTemp: 8.9, iceCreamSales: 200000 },
        ],
        series: [
            {
                type: 'bar', xKey: 'month', yKey: 'iceCreamSales', fill: '#9b59b6',
            },
        ],
        axes: getAxes("Months", "category", "Ice Cream Sales", "number"),
        background: {
            fill: "#f8ebfc"
        },
    });


    useEffect(() => {

    }, []);

    return (
        <section className="h-screen overflow-y-scroll">
            <div className="h-fit flex items-center justify-start gap-2">
                <FaArrowLeft onClick={() => navigate("/")} />
                <h1 className="text-lg md:text-xl font-semibold">Analytics</h1>
                {/* <TextBadge text={""} type={""} /> */}
            </div>
            <div className="flex flex-col gap-4">

                <div className="">
                    <ChartHeading
                        text={"Flow creation"}
                        info={"Flows created in every month can be tracked from here"}
                    />
                    <Chart chartOptions={barChartOptions} />
                </div>

                <div>
                    <ChartHeading
                        text={"Emails outreach"}
                        info={"Total emails send in jobs can be tracked from here"}
                    />
                    <Chart chartOptions={{
                        ...barChartOptions, series: [{
                            type: 'line', xKey: 'month', yKey: 'iceCreamSales', fill: '#9b59b6', stroke: '#6c3483',
                        },]
                    }} />
                </div>

            </div>
        </section>
    )
}

const getAxes = (xLabel, xType, yLabel, yType) => {
    return [
        {
            type: `${xType}`,
            position: 'bottom',
            title: { text: `${xLabel}` },
        },
        {
            type: `${yType}`,
            position: 'left',
            title: { text: `${yLabel}` },
        },
    ];
}

const ChartHeading = ({ text, info }) => {
    const [infoText, setInfoText] = useState("");
    return (
        <div className="h-14 p-3 my-2 flex items-center justify-between gap-2 space-x-3">
            <div>
                <h2 className="text-base md:text-lg font-medium text-brand">{text}</h2>
                <p className="text-base text-neutral-700">{info}</p>
            </div>
            <FaInfoCircle
                className="text-blue-400 cursor-pointer" />
        </div>
    )
}

export default Analytics;