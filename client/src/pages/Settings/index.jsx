import { FaArrowLeft } from "react-icons/fa";
import { TextBadge } from "../../components";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate();
    return (
        <section className="">
            <div className="h-fit flex items-center justify-start gap-2">
                <FaArrowLeft onClick={() => navigate("/")} />
                <h1 className="text-lg md:text-xl font-semibold">Settings</h1>
                {/* <TextBadge text={""} type={""} /> */}
            </div>
        </section>
    )
}

export default Settings;