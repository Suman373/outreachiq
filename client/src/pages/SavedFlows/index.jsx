import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { getFlowsByUser } from "../../api/flow";
import toast from "react-hot-toast";
import { TextBadge } from "../../components";
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { flowStatus } from "../../utils";

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

const SavedFlows = () => {

    const navigate = useNavigate();
    const [savedFlows, setSavedFlows] = useState([]);
    const { userObj } = useAuthContext();

    console.log(savedFlows);

    const heads = [
        "Flow name",
        "Total Jobs",
        "Completed Jobs",
        "Failed Jobs",
        "Status",
        "Actions"
    ]

    const fetchFlowsByUser = async (userId) => {
        try {
            const flows = await getFlowsByUser(userId);
            setSavedFlows(flows.result);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load flows");
        }
    }

    const handleViewFlow = (id) => {
        navigate(`/flow/${id}`);
    }

    useEffect(() => {
        fetchFlowsByUser(userObj.id);
    }, []);

    return (
        <section className="">
            <div className="h-fit flex items-center justify-start gap-2">
                <FaArrowLeft onClick={() => navigate("/")} />
                <h1 className="text-lg md:text-xl font-semibold">Saved Sequences </h1>
                <TextBadge text={savedFlows.length} type={""} />
            </div>
            {savedFlows.length > 0 ? (
                <table className="w-full border-collapse my-8 overflow-x-scroll">
                    <thead>
                        <tr>
                            {heads.map((heading, index) => (
                                <th
                                    key={index}
                                    className="px-4 py-2 text-left border-b font-normal text-neutral-600"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {savedFlows.map((flow) => (
                            <tr key={flow.id} className="hover:bg-gray-50 text-brand/80 font-semibold">
                                <td className="table-td">{flow.name}</td>
                                <td className="px-4 py-2 border-b">{flow.totalJobs}</td>
                                <td className="px-4 py-2 border-b">{flow.completedJobs}</td>
                                <td className="px-4 py-2 border-b">{flow.failedJobs}</td>
                                <td
                                    className={`table-td 
            ${flow.status === "completed" ? "text-green-600" :
                                            flow.status === "failed" ? "text-red-600" : flow.status === "scheduled" ? "text-blue-500" :
                                                "text-yellow-600"}`}>
                                    {flowStatus[flow.status || "draft"]}
                                </td>

                                <td className="px-4 py-2 border-b flex items-center gap-3">
                                    <button
                                        onClick={() => handleViewFlow(flow.flowId)}
                                        className="text-sm shadow-sm shadow-brandLighter p-1 bg-brandLighter rounded-md ">
                                        View
                                    </button>
                                    <button className="text-sm shadow-sm shadow-brandLighter p-1 bg-brandLighter rounded-md ">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
                // flows  not available
                :
                <div className="h-[500px] grid place-content-center text-center">
                    <h2 className="text-brand text-lg md:text-2xl">Sorry 🥹 No flows available to show</h2>
                    <p className="text-sm md:text-base my-2 text-neutral-600">Your saved flows will appear here</p>
                </div>
            }
        </section>
    )
}

export default SavedFlows;