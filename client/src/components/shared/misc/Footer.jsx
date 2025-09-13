import logo from '/favicon.png';
import SocialX from '../../../assets/social-x.svg';
import SocialInsta from '../../../assets/social-insta.svg';
import SocialLinkedin from '../../../assets/social-linkedin.svg';
import SocialYt from '../../../assets/social-youtube.svg';
import appJson from '../../../data/app.json';

const Footer = () => {
    return (
        <footer className="mt-10 py-10 text-base md:text-lg text-center
     bg-black text-neutral-300">
            <div className="container max-w-none">
                <div className="inline-flex relative before:content-['']">
                    <a href="/">
                        <img className='bg-white rounded-full p-1 cursor-pointer text-black' src={logo}
                            height={60}
                            width={60}
                            alt='logo' /></a>
                </div>
                <nav className='flex flex-col gap-6 mt-6 md:flex-row md:justify-center'>
                    {appJson?.navLinks?.map((item, index) => (
                        <a
                            key={index}
                            href={`${item.href}`}>{item.text}</a>
                    ))}
                </nav>
                <div className='flex justify-center gap-6 mt-6'>
                    <a className='footer-icon' href="#"><img src={SocialInsta} alt="insta" /></a>
                    <a className='footer-icon' href="#"> <img src={SocialX} alt="insta" /></a>
                    <a className='footer-icon' href="#"><img src={SocialLinkedin} alt="insta" /></a>
                    <a className="footer-icon" href="#"><img src={SocialYt} alt="insta" /></a>
                </div>
                <p className='my-5'>&copy; 2025 OutreachIQ. All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;