import { MdError } from "react-icons/md";
import { IoWarning } from "react-icons/io5";
import { FaInfoCircle , FaLock} from "react-icons/fa";
import { GrValidate } from "react-icons/gr";
const TextBadge = ({ text, type, customStyle }) => {
    let badgeStyle = "bg-gray-300 text-black";
    let badgeIcon ;
    switch (type) {
        case 'warn':
            badgeStyle = 'bg-amber-200 text-amber-800';
            badgeIcon = <IoWarning/>
            break;
        case 'error':
            badgeStyle = 'bg-red-300 text-red-800';
            badgeIcon = <MdError/>
            break;
        case 'info':
            badgeStyle = 'bg-blue-200 text-blue-800';
            badgeIcon = <FaInfoCircle/>
            break;
        case 'success':
            badgeStyle = 'bg-green-300 text-green-800';
            badgeIcon = <GrValidate/>
            break;
        case 'paywall':
            badgeStyle = "bg-brandLight text-black";
            badgeIcon = <FaLock/>
            break;
    }

    return (
        <div 
        style={customStyle}
        className={`w-18 h-6 px-3 py-2 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1 ${badgeStyle} `}>
            {badgeIcon}
            {text}</div>
    )
}

export default TextBadge;