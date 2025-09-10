import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FlowLogs = () => {
  const navigate = useNavigate();
  return (
    <section className="">
      <div className="h-fit flex items-center justify-start gap-2">
        <FaArrowLeft onClick={() => navigate("/")} />
        <h1 className="text-lg md:text-xl font-semibold">Flow Logs</h1>
        {/* <TextBadge text={""} type={""} /> */}
      </div>
      <div>
        <p className="my-4 text-neutral-600 px-2">This feature will be available soon.</p>
      </div>
    </section>
  )
}

export default FlowLogs;