import { Handle } from "@xyflow/react";
const LeadSource = ({ onClick, data, type }) => {
    return (
        <div
            className="h-12 w-fit border p-2 border-orange-500 rounded-md bg-orange-200 flex items-center justify-center"
            onClick={onClick}>
            <Handle type="target" position="top" />
            <div className="flex justify-center items-center gap-1">
                <p className="text-[10px]">{type || "type"}</p>
                <p className="text-[9px]">( {data?.label || "label"} )</p>
                <p className="text-[9px]">( {data?.title || "title"} )</p>
            </div>
            <Handle type="source" position="bottom" />
        </div>
    )
}

export default LeadSource;