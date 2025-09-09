import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils";
import { Footer } from "../../components";
import { getResetLink, resetUserPassword } from "../../api/auth";

const ResetPassword = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetLinkSent, setResetLinkSent] = useState(false);

    const handleRequestLink = async () => {
        try {
            if (!validateEmail(email)) {
                return toast.error("Please enter valid email address");
            }
            // POST /forgot-password
            const response = await getResetLink(email);
            if (response.status !== 200) throw new Error("Could not send reset link");
            toast.success("Reset link has been sent to your email");
            setResetLinkSent(true);
        } catch (error) {
            toast.error(error?.message || "Something went wrong");
        }
    }

    const handleResetPassword = async () => {
        try {
            if (!validatePassword(newPassword)) {
                return toast.error("Please enter valid password");
            }
            if (newPassword !== confirmPassword) {
                return toast.error("Passwords do not match");
            }
            // POST /reset-password with { newPassword, token }
            const response = await resetUserPassword(newPassword, token);
            if (response.status !== 200) throw new Error("Could not reset password.");
            toast.success("Password changed. Please login again");
            setEmail(""); setNewPassword(""); setResetLinkSent(false); setConfirmPassword("");
            setTimeout(() => {
                navigate('/register');
            }, 2000);
        } catch (error) {
            console.log(error);
            toast.error(error?.message || "Something went wrong");
        }
    };

    return (
        <>
            <div className="min-h-[100vh] w-full flex flex-col items-center justify-center gap-2">
                <h2 className="text-lg md:text-3xl text-brand my-3">OutreachIQ Reset Password</h2>
                {!token ? (
                    // Forgot Password form
                    <div className="flex flex-col max-w-md  p-2">
                        <div className="mb-2">
                            <label htmlFor="email" className="block text-base font-medium text-gray-800">Enter your email where we can send you the reset link</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                required
                                className="w-full my-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:brand"
                            />
                        </div>
                        {resetLinkSent && <p className="my-3">If the email {email} exists, we have sent you the reset link.</p>}
                        {!resetLinkSent && <button
                            disabled={resetLinkSent}
                            className="w-full py-3 bg-brand text-white font-semibold rounded-md hover:bg-brandLight focus:outline-none focus:ring-2 focus:brand"
                            onClick={handleRequestLink}>Send Reset Link</button>}

                        <a className="underline text-brandLight my-3" href="/">Go back to home</a>
                    </div>
                ) : (
                    // Reset Password form
                    <div className="flex flex-col max-w-md  p-2">
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-base font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Must be 8 characters"
                                required
                                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:brand"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-base font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Must be 8 characters"
                                required
                                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:brand"
                            />
                            <p className='text-sm my-1 text-amber-600'>Password must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 special character</p>
                        </div>
                        <button
                            className="w-full py-3 bg-brand text-white font-semibold rounded-md hover:bg-brandLight focus:outline-none focus:ring-2 focus:brand"
                            onClick={handleResetPassword}>Reset Password</button>
                        <a className="underline text-brandLight my-3" href="/">Go back to home</a>
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}

export default ResetPassword;