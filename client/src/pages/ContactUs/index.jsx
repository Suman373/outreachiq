import { useState } from "react";
import { Footer } from "../../components";
import toast from "react-hot-toast";
import { validateEmail } from "../../utils";

const ContactUs = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleFormSubmission = (e) => {
        e.preventDefault();
        try {
            if (!name || !email || !message) throw new Error("Please fill the details correctly");
            if (!validateEmail(email)) throw new Error("Enter valid email address");
            // will add 3rd party integration here, like emailjs
            toast.success("We have received your email.\nOur team will reach you shortly");
        } catch (error) {
            console.log(`Error while contact form submission - ${error}`);
            toast.error(error.message || "Something went wrong");
        }
    }

    return (
        <>
            <div id="contact-us" className="overflow-hidden bg-white py-16 px-4sm:px-6 lg:px-8 lg:py-24">
                <div className="relative mx-auto max-w-xl">
                    <svg className="absolute left-full translate-x-1/2 transform" width="404" height="404" fill="none"
                        viewBox="0 0 404 404" aria-hidden="true">
                        <defs>
                            <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20"
                                patternUnits="userSpaceOnUse">
                                <rect x="0" y="0" width="4" height="4" className="text-gray-200"
                                    fill="currentColor"></rect>
                            </pattern>
                        </defs>
                        <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"></rect>
                    </svg>
                    <svg className="absolute right-full bottom-0 -translate-x-1/2 transform" width="404" height="404" fill="none"
                        viewBox="0 0 404 404" aria-hidden="true">
                        <defs>
                            <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20"
                                patternUnits="userSpaceOnUse">
                                <rect x="0" y="0" width="4" height="4" className="text-gray-200"
                                    fill="currentColor"></rect>
                            </pattern>
                        </defs>
                        <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"></rect>
                    </svg>
                    <div className="text-center">
                        <h2 className="section-h1">Contact Us
                        </h2>
                        <p className="my-4 text-lg leading-6 text-neutral-800">Please use the form below to contact us.
                            Thank you!
                        </p>
                    </div>
                    <div className="mt-12">
                        <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-800">Name</label>
                                <div className="mt-1">
                                    <input name="name" type="text" id="name" required className="border border-gray-300 block w-full rounded-md py-3 px-4 shadow-sm focus:border-brand focus:ring-brand " />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-800">Email</label>
                                <div className="mt-1">
                                    <input name="email" id="email" required type="email" className="border border-gray-300 block w-full rounded-md py-3 px-4 shadow-sm focus:border-brand focus:ring-brand" />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block text-sm font-medium text-neutral-800">Message</label>
                                <div className="mt-1">
                                    <textarea required name="message" id="message" rows="4" className="border border-gray-300 block w-full rounded-md py-3 px-4 shadow-sm focus:border-brand focus:ring-brand"></textarea>
                                </div>
                            </div>
                        </form>
                        <div className="min-w-full">
                            <button
                                onClick={(e)=> handleFormSubmission(e)}
                                className="w-full h-10 px-3 py-1 bg-brand text-white text-sm rounded-md mt-8">
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ContactUs;

