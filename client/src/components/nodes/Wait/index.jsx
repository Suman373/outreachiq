import { Handle } from "@xyflow/react";
import { BsClock } from "react-icons/bs";

const Wait = ({ onClick, data, type }) => {
    return (
        <div
            className="h-12 w-fit border p-2 border-green-500 rounded-md bg-green-100 flex items-center justify-center"
            onClick={onClick}>
            <Handle type="target" position="top" />
            <div className="flex justify-center items-center gap-1">
                <BsClock className='text-[22px] text-green-500' />
                <p className="text-[10px]">{type || "type"}</p>
                <p className="text-[9px]">( {data?.label || "label"} )</p>
            </div>
            <Handle type="source" position="bottom" />
        </div>
    )
}

export default Wait;