import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Chart } from "../../components";
import { getAxes, getUserYears, quickStatsEnum } from "../../utils";
import { useAuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { getFlowSummary, getQuickStats } from "../../api/analytics";


const flowCreationDefaultOpts = {
    data: [
        { month: 'Jan', count: 0 },
        { month: 'Feb', count: 0 },
        { month: 'Mar', count: 0 },
        { month: 'Apr', count: 0 },
        { month: 'May', count: 0 },
        { month: 'Jun', count: 0 },
        { month: 'Jul', count: 0 },
        { month: 'Aug', count: 0 },
        { month: 'Sep', count: 0 },
        { month: 'Oct', count: 0 },
        { month: 'Nov', count: 0 },
        { month: 'Dec', count: 0 },
    ],
    series: [
        {
            type: 'line', xKey: 'month', yKey: 'count', fill: '#9b59b6', stroke: '#6c3483',
        },
    ],
    axes: getAxes("Months", "category", "Flows Created", "number"),
    background: {
        fill: "#f8ebfc"
    },
}

const emailTrendDefaultOpts = {
    data: [
        { month: 'Jan', count: 0 },
        { month: 'Feb', count: 0 },
        { month: 'Mar', count: 0 },
        { month: 'Apr', count: 0 },
        { month: 'May', count: 0 },
        { month: 'Jun', count: 0 },
        { month: 'Jul', count: 0 },
        { month: 'Aug', count: 0 },
        { month: 'Sep', count: 0 },
        { month: 'Oct', count: 0 },
        { month: 'Nov', count: 0 },
        { month: 'Dec', count: 0 },
    ],
    series: [
        {
            type: 'bar', xKey: 'month', yKey: 'count', fill: '#9b59b6', stroke: '#6c3483',
        },
    ],
    axes: getAxes("Months", "category", "Emails Delivered", "number"),
    background: {
        fill: "#f8ebfc"
    },
}


const Analytics = () => {
    const navigate = useNavigate();
    const [year, setYear] = useState(new Date().getFullYear());
    const { userObj } = useAuthContext();
    const [summaryAnalytics, setSummaryAnalytics] = useState({});
    const [flowCreateChartOpts, setFlowCreationChartOpts] = useState(flowCreationDefaultOpts);
    const [emailsChartOpts, setEmailsChartOpts] = useState(emailTrendDefaultOpts);
    const [quickStats, setQuickStats] = useState({});

    const updateChartTrendData = (chartOption, trendData) => {
        const trendMap = new Map(chartOption.data.map(item => [item.month, item.count]));
        trendData.forEach((it) => trendMap.set(it.month, it.count));
        const newData = [...trendMap].map((item) => ({ month: item[0], count: item[1] })); // ['Jan',0]-> {month:'Jan',count:0}
        // console.log(newData);
        return newData;
    }

    // fetch summary
    const fetchSummaryAnalytics = async (userId, year) => {
        try {
            const res = await getFlowSummary(userId, year);
            if (!res) throw new Error();
            setSummaryAnalytics(res.result);
            setFlowCreationChartOpts(pr => ({ ...pr, data: updateChartTrendData(flowCreateChartOpts, res.result.flowCreationTrend) }));
            setEmailsChartOpts(pr => ({ ...pr, data: updateChartTrendData(emailsChartOpts, res.result.emailSentTrend) }));
            // console.log("RES FROM SUMMARY", res);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load summary.\nPlease try again later");
        }
    }

    // fetch quick stats
    const fetchQuickStatsAnalytics = async (userId, year) => {
        try {
            const res = await getQuickStats(userId, year);
            if (!res) throw new Error();
            setQuickStats(res.result);
            // console.log(res);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load quickstats.\nPlease try again later");
        }
    }


    useEffect(() => {
        if (!userObj?.id || !year) return;
        fetchSummaryAnalytics(userObj.id, year);
        fetchQuickStatsAnalytics(userObj.id, year);
    }, [userObj.id, year]);

    return (
        <section className="h-screen overflow-y-scroll pb-10">
            <div className="h-fit flex items-center justify-start gap-2">
                <FaArrowLeft onClick={() => navigate("/")} />
                <h1 className="text-lg md:text-xl font-semibold">Analytics</h1>
                {/* <TextBadge text={""} type={""} /> */}
            </div>
            <div className="flex flex-col gap-4">

                <div className="">
                    <ChartHeading
                        text={"Quick Stats"}
                        info={"A summary of your performance of flows can be tracked from here"}
                        year={year}
                        setYear={setYear}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-5 items-center px-3 my-4">
                        {Object.entries(quickStats)?.map(([key, value]) =>
                            <div className="w-36 py-1 px-2 pl-4 h-24 bg-brandLighter flex flex-col items-start justify-evenly  
                            rounded-md">
                                <p className="text-sm font-semibold text-brand/90">{quickStatsEnum[key]}</p>
                                <p className="text-xl md:text-3xl font-semibold text-brand">{value}</p>
                            </div>)}
                    </div>
                </div>

                <div className="">
                    <ChartHeading
                        text={"Flow Creation Trend"}
                        info={"Flows created in every month can be tracked from here"}
                        year={year}
                        setYear={setYear}
                    />
                    {/* <Chart chartOptions={barChartOptions} /> */}
                    <Chart chartOptions={flowCreateChartOpts} />
                </div>

                <div>
                    <ChartHeading
                        text={"Emails Delivered Trend"}
                        info={"Total emails send in jobs can be tracked from here"}
                        year={year}
                        setYear={setYear}
                    />
                    <Chart chartOptions={emailsChartOpts} />
                </div>

            </div>
        </section>
    )
}

const ChartHeading = ({ text, info, year, setYear }) => {
    const {userObj} = useAuthContext();
    const [infoText, setInfoText] = useState("");
    const handleYearChange = (e)=>{
        if(e.target.value === "") return;
        alert(`Year - ${e.target.value}`);
        setYear(e.target.value);
    }
    const availYears = getUserYears(userObj.createdAt);
    return (
        <div className="h-14 p-3 my-2 flex items-center justify-between gap-2 space-x-3">
            <div>
                <h2 className="text-base md:text-lg font-medium text-brand">{text}</h2>
                <p className="text-base text-neutral-700">{info}</p>
            </div>
            <div className="flex gap-3 items-center ">
                <select 
                value={year}
                onChange={handleYearChange}
                className="bg-brandLighter p-2 rounded-md">
                   {availYears?.map((y,i)=> (
                    <option value={y} key={i}>{y}</option>
                   ))}
                </select>
                <FaInfoCircle
                    className="text-blue-400 cursor-pointer" />
            </div>
        </div>
    )
}

export default Analytics;