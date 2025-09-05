import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { TextBadge } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import gpay from '../../assets/payment/gpay.png';
import mastercard from '../../assets/payment/mastercard.png';
import visa from '../../assets/payment/visa.png';
import toast from "react-hot-toast";
import { getUserSettings, patchUserSettings } from "../../api/settings";

const paymentMethods = [
    {
        mode: "Google Pay",
        value: "gpay",
        icon: gpay,
    },
    {
        mode: "Mastercard",
        value: "mastercard",
        icon: mastercard
    },
    {
        mode: "Visa",
        value: "visa",
        icon: visa
    }
];

const appLanguages = [
    {
        name: "English",
        value: "en"
    },
]

const Settings = () => {
    const navigate = useNavigate();
    const { userObj } = useAuthContext();
    const [isDirty, setIsDirty] = useState(false);
    const [settingsState, setSettingsState] = useState({
        language: "en",
        emailNotifications: false,
        emailProvider: {
            enabled: false,
            provider: "nodemailer",
        },
        webhooksEnabled: false,
        webhooks: [],
        paymentMethods: [],
        twoFactorAuth: false,
    });

    const invalidSettings = ["emailProvider", "webhooksEnabled", "webhooks", "paymentMethods"];

    const handleUpdateSettings = (key, value) => {
        if (invalidSettings.includes(key)) {
            toast.error("Settings not available in free plan");
            return;
        }
        console.log(`Changing ${key}-> ${value}`);
        setSettingsState(prev => (
            {
                ...prev,
                [key]: value,
            }
        ));
        setIsDirty(true);
    };

    const handlePaymentChange = (method) => {
        console.log(settingsState.paymentMethods);
        if (settingsState.paymentMethods.includes(method.value)) {
            handleUpdateSettings("paymentMethods", settingsState.paymentMethods.filter(it => it !== method.value));
        } else {
            handleUpdateSettings("paymentMethods", [...settingsState.paymentMethods, method.value]);
        }
    }

    const fetchUserSettings = async(userId)=>{
        try {
            const data = await getUserSettings(userId);
            console.log(data);
            setSettingsState(data.result);
        } catch (error) {   
            console.log(error);
            toast.error("Failed to fetch settings.\nTry again later");
        }
    }

    const updateUserSettings = async(userId)=>{
        try {
            const data = await patchUserSettings(userId, settingsState);
        } catch (error) {
            console.log(error);
            toast.error("Failed to update settings.\nTry again later");
        }
    }

    useEffect(()=>{
        if(!userObj.id || userObj.id === "")return;
        fetchUserSettings(userObj.id);
    },[]);

    return (
        <section className="">
            <div className="h-fit flex items-center justify-start gap-2">
                <FaArrowLeft onClick={() => navigate("/")} />
                <h1 className="text-lg md:text-xl font-semibold">Settings</h1>
            </div>
            <div className="settings-main-div">
                <h2 className="text-base md:text-lg font-medium text-brand my-4 px-3">App Preferences</h2>
                <div className="settings-div">
                    <p className="text-base text-neutral-800 font-medium">Language</p>
                    <select className="bg-brandLighter p-2 rounded-md">
                        {appLanguages.map((item, i) => (
                            <option key={i} value={item.value}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="settings-div">
                    <p className="text-base text-neutral-800 font-medium">Email Notifications</p>
                    <span className="text-3xl text-brand">
                        {settingsState.emailNotifications ?
                            <FaToggleOn onClick={() => handleUpdateSettings("emailNotifications", false)} />
                            :
                            <FaToggleOff onClick={() => handleUpdateSettings("emailNotifications", true)} />}
                    </span>
                </div>
            </div>
            <div className="settings-main-div">
                <h2 className="text-base md:text-lg font-medium text-brand my-4 px-3">Integrations <span className="soon">(Soon)</span></h2>
                <div className="settings-div">
                    <p className="text-base text-neutral-800 font-medium">Email Providers</p>
                    <span className="text-3xl text-brand">
                        {settingsState.emailProvider.enabled ?
                            <FaToggleOn onClick={() => handleUpdateSettings("emailProvider", {...settingsState.emailProvider, enabled:false})} />
                            :
                            <FaToggleOff onClick={() => handleUpdateSettings("emailProvider", {...settingsState.emailProvider, enabled: true})} />}
                    </span>
                </div>
                <div className="settings-div">
                    <p className="text-base text-neutral-800 font-medium">Webhooks</p>
                    <span className="text-3xl text-brand">
                        {settingsState.webhooksEnabled ?
                            <FaToggleOn onClick={() => handleUpdateSettings("webhooksEnabled", false)} />
                            :
                            <FaToggleOff onClick={() => handleUpdateSettings("webhooksEnabled", true)} />}
                    </span>
                </div>

            </div>
            <div className="settings-main-div">
                <h2 className="text-base md:text-lg font-medium text-brand my-4 px-3">Billing and Subscriptions <span className="soon">(Soon)</span></h2>
                <div className="settings-div">
                    <p className="text-base text-neutral-800 font-medium">Current Plan</p>
                    <div className="flex items-center justify-start gap-2">
                        <span className="font-semibold mr-3">
                            {userObj.subscriptionPlanName?.charAt(0).toUpperCase() + userObj.subscriptionPlanName?.slice(1) || "Free"}
                        </span>
                        <Link
                            className="py-2 text-brand text-sm cursor-pointer flex items-center gap-1 justify-evenly"
                            to={"#"}>
                            Upgrade Plan  <FaExternalLinkAlt className="text-xs text-brand" />
                        </Link>

                    </div>
                </div>
                <div className="settings-div">
                    <p className="text-base text-neutral-800 font-medium">Payment Methods</p>
                    <div className="flex items-center justify-start gap-2 my-3">
                        {
                            paymentMethods.map((method, index) => (
                                <img
                                    className={`h-10 px-5 py-1 mix-blend-darken ${settingsState.paymentMethods.find(m => m === method.value) ? "border-brandLight border-2" : ""}`}
                                    onClick={() => handlePaymentChange(method)}
                                    src={method.icon}
                                    alt={method.value} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="settings-main-div">
                <h2 className="text-base md:text-lg font-medium text-brand my-4 px-3">Security and Privacy  <span className="soon">(Soon)</span></h2>
                <div className="settings-div">
                    <p className="text-base text-neutral-800 font-medium">Two Factor Authentication (2FA)</p>
                    <span className="text-3xl text-brand">
                        {settingsState.twoFactorAuth ?
                            <FaToggleOn onClick={() => handleUpdateSettings("twoFactorAuth", false)} />
                            :
                            <FaToggleOff onClick={() => handleUpdateSettings("twoFactorAuth", true)} />}
                    </span>
                </div>
            </div>
            <div className="flex justify-end items-center">
                <button
                    onClick={updateUserSettings}
                    disabled={!isDirty}
                    className={`h-10 px-3 py-1 ${isDirty ? " bg-brand" : "bg-neutral-500"} text-white text-sm rounded-md my-3`}>
                    Save Changes
                </button>
            </div>
        </section>
    )
}

export default Settings;