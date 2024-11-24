import { Handle } from "@xyflow/react";
import { FaPlus } from "react-icons/fa";
const AddBlock = ({ onClick }) => {
  return (
    <div
      className="h-8 w-8 border border-blue-400 bg-gray-100 flex items-center justify-center"
      onClick={onClick}>
      <Handle type="target" position="top" />
      <FaPlus className="text-sm text-blue-500"/>
    </div>
  )
}

export default AddBlock;