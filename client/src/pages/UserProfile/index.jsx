import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { billingDateFields, calculateBillingDates, validatePassword } from "../../utils";
import { updateUserProfileImg } from "../../api/user";


const UserProfile = () => {
    const navigate = useNavigate();
    const { userObj } = useAuthContext();

    const [profileImgUrl, setProfileImgUrl] = useState(userObj?.profileImage?.url || "https://images.unsplash.com/photo-1556983990-db5d0cc3c67e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGR1bW15fGVufDB8fDB8fHww");
    
    const [profileData, setProfileData] = useState({
        name: userObj?.name || "",
        email: userObj?.email || "",
        phoneNumber: userObj?.phoneNumber || "",
        country: userObj?.country || "",
    });
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [changePwdClicked, setChangePwdClicked] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const billingInfo = calculateBillingDates(userObj.renewalDate);

    const renderBillingDate = () => {
        return (
            <div className="flex items-center justify-between">
                <div className="flex gap-20">
                    {Object.entries(billingInfo)?.map(([k, v]) => (
                        <div className="block">
                            <p className="text-black font-medium">{billingDateFields[k]}</p>
                            <p>{v.toString()}</p>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <button className="text-red-500">
                        Cancel Subscription
                    </button>
                    <button className="text-brand">
                        Upgrade Plan
                    </button>
                </div>
            </div>
        )
    }

    const handleImageUpload = async(e)=>{
        try {
            const file = e.target.files[0];
            console.log(file);
            if(!file) return toast.error("No file detected");
            if(!userObj.id) return toast.error("Id is required");
            const formData = new FormData();
            formData.append("image",file);
            const data = await updateUserProfileImg(userObj.id, formData);
            if(data.status !== 200) throw new Error();
            setProfileImgUrl(data.data?.result);
            toast.success("Profile image updated successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update image.\nPlease try again later");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
        setIsDirty(true);
    };

    const handleUpdateProfile = () => {
        // TODO: Call API to update profile
        // console.log("Updated profile:", profileData);
        setIsDirty(false);
    };

    const handleChangePassword = () => {
        try {
            if (!validatePassword(oldPassword)) throw new Error("Old password is not valid");
            if (!validatePassword(newPassword)) throw new Error("New password is not valid");
            if (oldPassword !== newPassword) throw new Error("Passwords don't match");
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Something went wrong");
        }
    };

    const resetProfileChanges = () => {
        setProfileData({
            name: userObj?.name || "",
            email: userObj?.email || "",
            phoneNumber: userObj?.phoneNumber || "+91XXXXXXXXX",
        });
        setIsDirty(false);
        toast.success("Changes have been reset");
    }

    return (
        <section className="h-screen overflow-y-scroll pb-10">
            <div className="h-fit flex items-center justify-start gap-2 mb-4">
                <FaArrowLeft
                    onClick={() => navigate("/")}
                    className="cursor-pointer "
                />
                <h1 className="text-lg md:text-xl font-semibold">Profile</h1>
            </div>

            <div className="settings-main-div">
                {/* Profile Picture */}
                <div className="settings-div flex flex-col items-center justify-center gap-4 h-fit py-3">
                    <img 
                    className="object-contain h-20 md:w-20 rounded-full border border-brand bg-brandLight" 
                    src={profileImgUrl} alt="profile" />
                    <label 
                    className="text-brand font-lg underline cursor-pointer"
                    htmlFor="profileImage">Change picture</label>
                    <input
                        onChange={handleImageUpload}
                        className="opacity-0"
                        id="profileImage"
                        accept="image/*"
                        type="file" />
                </div>
                {/* personal details  */}
                <h2 className="text-base md:text-lg font-medium text-brand my-4 px-2">
                    Personal Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4 px-2">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                            placeholder="example@mail.com"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="phoneNumber"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={profileData.phoneNumber}
                            onChange={handleChange}
                            placeholder="+91XXXXXXXXX"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Country
                        </label>
                        <select
                            id="country"
                            name="country"
                            value={profileData.country}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                        >
                            <option className="bg-white">India</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="settings-main-div">
                <h2 className="text-base md:text-lg font-medium text-brand my-4 px-2">
                    Security
                </h2>
                <div className="grid grid-cols-3 gap-2 w-full relative my-4 px-2">
                    {
                        changePwdClicked && (
                            <>
                                <div>
                                    <label
                                        htmlFor="oldPassword"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Old Password
                                    </label>
                                    <input
                                        type="password"
                                        id="oldPassword"
                                        name="oldPassword"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="newPassword"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                                    />
                                </div>
                            </>
                        )
                    }
                    <div className="flex items-center justify-start gap-2">
                        {changePwdClicked ? (
                            <button
                                onClick={handleChangePassword}
                                className="max-w-fit h-10 px-3 py-1 bg-brand text-white text-sm rounded-md mt-8">
                                Change
                            </button>) : null}
                        <button
                            onClick={() => setChangePwdClicked(pr => !pr)}
                            className={`max-w-fit h-10 px-3 py-1 ${changePwdClicked ? " bg-white border border-brand text-brand mt-8" : "bg-brand text-white"} text-sm rounded-md`}>
                            {changePwdClicked ? "Cancel" : "Change Password"}
                        </button>

                    </div>
                </div>
            </div>
            <div className="settings-main-div">
                <h2 className="text-base md:text-lg font-medium text-brand my-4">
                    Billing & Subscription
                </h2>
                <div className="flex flex-col gap-2 mb-4  text-neutral-600 border border-brandLight/50 rounded-md p-3">
                    <p className="text-black">Plan Details</p>
                    <p className="text-lg font-medium">Free (Monthly)</p>
                    {renderBillingDate()}
                </div>
                <div className="flex flex-col gap-2 mb-4  text-neutral-600 border border-brandLight/50 rounded-md p-3">
                    <p className="text-black">Account Plan Usage</p>
                    <div className="mb-1 text-base font-medium   flex items-center justify-between">
                        <span>Emails</span>
                        <span>{userObj.usage.emails} of {userObj.quota.emails} used ( {userObj.quota.emails - userObj.usage.emails} remaining )</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-brand/70 h-2.5 rounded-full"
                            style={{ width: `${(userObj.quota.emails - userObj.usage.emails) / (userObj.quota.emails) * 100}%` }}></div>
                    </div>
                    <div className="mb-1 text-base font-medium   flex items-center justify-between">
                        <span>Flows</span>
                        <span>{userObj.usage.flows} of {userObj.quota.flows} used ( {userObj.quota.flows - userObj.usage.flows} remaining )</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-brand/70 h-2.5 rounded-full"
                            style={{ width: `${(userObj.quota.flows - userObj.usage.flows) / (userObj.quota.flows) * 100}%` }}></div>
                    </div>
                    <div className="mb-1 text-base font-medium   flex items-center justify-between">
                        <span>Nodes</span>
                        <span>{userObj.usage.nodes} of {userObj.quota.nodes} used ( {userObj.quota.nodes - userObj.usage.nodes} remaining )</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-brand/70 h-2.5 rounded-full"
                            style={{ width: `${(userObj.quota.nodes - userObj.usage.nodes) / (userObj.quota.nodes) * 100}%` }}></div>
                    </div>
                    <div className="mb-1 text-base font-medium   flex items-center justify-between">
                        <span>Leads</span>
                        <span>{userObj.usage.leads} of {userObj.quota.leads} used ( {userObj.quota.leads - userObj.usage.leads} remaining )</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-brand/70 h-2.5 rounded-full"
                            style={{ width: `${(userObj.quota.leads - userObj.usage.leads) / (userObj.quota.leads) * 100}%` }}></div>
                    </div>
                    <div className="mb-1 text-base font-medium   flex items-center justify-between">
                        <span>AI assists</span>
                        <span>{userObj.usage.aiTokens} of {userObj.quota.aiTokens} used ( {userObj.quota.aiTokens - userObj.usage.aiTokens} remaining )</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-brand/70 h-2.5 rounded-full"
                            style={{ width: `${(userObj.quota.aiTokens - userObj.usage.aiTokens) / (userObj.quota.aiTokens) * 100}%` }}></div>
                    </div>

                </div>
            </div>
            {/* footer part with buttons */}
            <div className="flex justify-end items-center gap-3">
                <button
                    onClick={resetProfileChanges}
                    className={`h-10 px-3 py-1 bg-transparent text-brand border border-brand text-sm rounded-md my-3`}>
                    Reset Changes
                </button>
                <button
                    onClick={handleUpdateProfile}
                    disabled={!isDirty}
                    className={`h-10 px-3 py-1 ${isDirty ? " bg-brand" : "bg-neutral-500"} text-white text-sm rounded-md my-3`}>
                    Save Changes
                </button>
            </div>
        </section>
    );
};

export default UserProfile;
