import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../contexts/AuthContext';
import Footer from '../../components/shared/misc/Footer';

const Auth = () => {

    const { setIsLoggedIn } = useAuthContext();
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [siginData, setSiginData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
    };

    const handleSigninChange = (e) => {
        const { name, value } = e.target;
        setSiginData({
            ...siginData,
            [name]: value
        });
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/users/register`, {
                name: signupData.username, email: signupData.email, password: signupData.password
            });
            console.log(data);
            if (data?.status !== 201) throw new Error;
            alert('Registration successful');
            localStorage.setItem('outreachiq-user', JSON.stringify(signupData));
            setSignupData({ username: '', email: '', password: '' });
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            console.log(error.message);
            alert(`Failed to sign up ${error?.message}`);
        }
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/users/login`, {
                email: siginData.email, password: siginData.password
            });
            if (data?.status !== 200) throw new Error;
            localStorage.setItem('outreachiq-user', JSON.stringify(siginData));
            setSiginData({ username: '', email: '', password: '' });
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            console.log(error.message);
            alert(`Failed to sign in ${error?.message}`);
        }
    };

    return (
        <>
            <div className="min-h-[100vh] w-full flex flex-col items-center justify-center gap-2">
                <h1 className='section-h1 mt-20'>Get Started with OutreachIQ</h1>
                <p className='sub-heading my-5'>Whether new here or already with us, you’re in the right place.</p>
                <div className="w-full max-w-md p-8 bg-white rounded-lg">
                    {
                        showLogin ?
                            <>
                                <h2 className="text-2xl font-bold text-center text-brand mb-6">Log in to your existing account</h2>
                                <form onSubmit={handleSignInSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={siginData.email}
                                            onChange={handleSigninChange}
                                            placeholder="john@example.com"
                                            required
                                            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:brand"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={siginData.password}
                                            onChange={handleSigninChange}
                                            placeholder="Must be 8 characters"
                                            required
                                            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:brand"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-brand text-white font-semibold rounded-md hover:bg-brandLight focus:outline-none focus:ring-2 focus:ring-brand"
                                    >
                                        Sign in
                                    </button>
                                </form>
                                <p className='text-md mx-1 my-2 '>Don't have an account? <span className='text-blue-600 cursor-pointer font-semibold' onClick={() => setShowLogin(false)}>Sign up</span></p>
                            </>
                            :
                            <>
                                <h2 className="text-2xl font-bold text-center  text-brand  mb-6">Create an account to start your journey</h2>
                                <form onSubmit={handleSignUpSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={signupData.username}
                                            onChange={handleSignupChange}
                                            placeholder="John Doe"
                                            required
                                            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:brand"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={signupData.email}
                                            onChange={handleSignupChange}
                                            placeholder="john@example.com"
                                            required
                                            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:brand"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={signupData.password}
                                            onChange={handleSignupChange}
                                            placeholder="Must be 8 characters"
                                            required
                                            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:brand"
                                        />
                                    </div>
                                    <p className='text-sm inline-flex gap-3 my-4'>
                                        <input
                                            defaultValue={false}
                                            checked={true}
                                            className='cursor-pointer'
                                            type='checkbox'
                                        />
                                        <span>I agree to the Terms & Conditions and Privacy Policy.</span>
                                    </p>
                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-brand text-white font-semibold rounded-md hover:bg-brandLight focus:outline-none focus:ring-2 focus:brand"
                                    >
                                        Sign Up
                                    </button>
                                </form>
                                <p className='text-md mx-1 my-2 '>Already have an account? <span className='text-blue-600 cursor-pointer font-semibold' onClick={() => setShowLogin(true)}>Sign in</span></p>
                            </>
                    }
                </div>
                <p>🔒 Your data is encrypted and never shared.
                    💳 No credit card required to start.
                    🚀 Cancel or upgrade anytime.</p>
            </div>
            <Footer />
        </>
    );
};

export default Auth;
