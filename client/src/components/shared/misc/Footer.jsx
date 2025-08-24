import logo from '../../../assets/social-x.svg';
import SocialX from '../../../assets/social-x.svg';
import SocialInsta from '../../../assets/social-insta.svg';
import SocialLinkedin from '../../../assets/social-linkedin.svg';
import SocialYt from '../../../assets/social-youtube.svg';

const Footer = () => {
    return (
        <footer className="mt-10 py-10 text-base md:text-lg text-center
     bg-black text-neutral-300">
            <div className="container max-w-none">
                <div className="inline-flex relative before:content-['']">
                    <img className='bg-white h-10 w-10 rounded-full p-1 cursor-pointer text-black' src={logo}
                        height={40}
                        alt='logo' />
                </div>
                <nav className='flex flex-col gap-6 mt-6 md:flex-row md:justify-center'>
                    <a href="#">About</a>
                    <a href="#">Features</a>
                    <a href="#">Customers</a>
                    <a href="#">Pricing</a>
                    <a href="#">Help</a>
                </nav>
                <div className='flex justify-center gap-6 mt-6'>
                    <a className='footer-icon' href="#"><img src={SocialInsta} alt="insta" /></a>
                    <a className='footer-icon' href="#"> <img src={SocialX} alt="insta" /></a>
                    <a  className='footer-icon' href="#"><img src={SocialLinkedin} alt="insta" /></a>
                    <a  className="footer-icon" href="#"><img src={SocialYt} alt="insta" /></a>
                </div>
                <p className='my-5'>&copy; 2025 OutreachIQ. All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;