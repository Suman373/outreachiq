import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = ({setIsLoggedIn}) => {

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

    const handleSignUpSubmit = async(e) => {
        e.preventDefault();
        try {
            const data = await axios.post(`${import.meta.VITE_API_ENDPOINT}/users/register`,{
                name: signupData.username, email: signupData.email, password: signupData.password
            });
            console.log(data);
            if(data?.status !== 201) throw new Error;
            alert('Registration successful');
            localStorage.setItem('email-seq-user', JSON.stringify(signupData));
            setSignupData({username:'',email:'',password:''});
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            console.log(error.message);
            alert(`Failed to sign up ${error?.message}`);
        }
    };

    const handleSignInSubmit = async(e) => {
        e.preventDefault();
        try {
            const data = await axios.post(`${import.meta.VITE_API_ENDPOINT}/users/login`,{
                email: siginData.email, password: siginData.password
            });
            if(data?.status !== 200) throw new Error;
            localStorage.setItem('email-seq-user', JSON.stringify(siginData));
            setSiginData({username:'',email:'',password:''});
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            console.log(error.message);
            alert(`Failed to sign in ${error?.message}`);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 gap-2">
            <div className='m-2 h-full max-w-[600px] flex flex-col items-center justify-start'>
                <h1 className='p-2 mx-2 text-6xl text-center text-blue-900 font-bold '>Email Sequence Tool</h1>
                <p className='p-2 mx-2 text-3xl text-center text-gray-500'>
                    Create automated email flows with customizable nodes to engage your audience and drive conversions effortlessly.
                </p>
            </div>
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                {
                    showLogin ?
                        <>
                            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
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
                                        className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                        className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Sign in
                                </button>
                            </form>
                            <p className='text-md mx-1 my-2 '>Don't have an account? <span className='text-blue-600 cursor-pointer font-semibold' onClick={() => setShowLogin(false)}>Sign up</span></p>
                        </>
                        :
                        <>
                            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
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
                                        className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                        className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                        className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Sign Up
                                </button>
                            </form>
                            <p className='text-md mx-1 my-2 '>Already have an account? <span className='text-blue-600 cursor-pointer font-semibold' onClick={() => setShowLogin(true)}>Sign in</span></p>
                        </>
                }
            </div>
        </div>
    );
};

export default Auth;
