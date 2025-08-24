import { FaArrowRight } from 'react-icons/fa';
import { IoMdClose, IoMdMenu } from "react-icons/io";
import Logo from '/vite.svg';
import { useEffect, useRef, useState } from 'react';
import AnimatedButton from '../misc/AnimatedButton';
import { BsArrowRight } from 'react-icons/bs';

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const checkMenuOpen = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", checkMenuOpen);

        return () => document.removeEventListener("mousedown", checkMenuOpen);
    }, []);

    return (
        <header ref={menuRef} className='sticky top-0 z-20 bg-transparent backdrop-blur-md'>
            <div className="flex justify-center items-center py-3 bg-black text-white gap-5">
                <p className='text-white/60 text-sm hidden md:block'>Streamline your workflow and boost your productivity</p>
                <div className="inline-flex gap-1 items-center">
                    <p>Get started for free</p>
                    <FaArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
                </div>
            </div>
            <div className='py-5'>
                <div className="container max-w-none">
                    <div className="flex items-center justify-between">
                        <img src={Logo} alt="brand logo" height={40} width={40} />
                        <a onClick={() => setIsMenuOpen(pr => !pr)} className='menu-btn'>
                            {isMenuOpen ? <IoMdClose className="h-5 w-5 md:hidden" /> : <IoMdMenu className="h-5 w-5 md:hidden" />}
                        </a>
                        <nav className='hidden md:flex gap-6 text-black/80 items-center'>
                            <a href="#">About</a>
                            <a href="#">Features</a>
                            <a href="#">Customers</a>
                            <a href="#">Updates</a>
                            <a href="#">Help</a>
                            <AnimatedButton
                                primary="#691e87"
                                secondary="#000000"
                                textBeforeColor="#fff"
                                textAfterColor="#fff"
                                text={"Get for free"}
                                icon={<BsArrowRight className="mt-1" />}
                            />
                        </nav>
                    </div>
                </div>
            </div>
            {
                isMenuOpen ? (
                    <div className='top-32 left-0 absolute w-full md:hidden bg-white  max-h-2xl transition-all duration-200 ease-in p-4'>
                        <nav className='flex flex-col items-start space-y-2 justify-start pl-4 gap-1 text-base'>
                            <a href="#">About</a>
                            <a href="#">Features</a>
                            <a href="#">Customers</a>
                            <a href="#">Updates</a>
                            <a href="#">Help</a>
                            <button className='btn btn-primary text-sm md:text-base'>
                                Get for free</button>
                        </nav>
                    </div>
                ) : null
            }
        </header>
    )
};

export default Navbar;
