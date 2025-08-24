import { motion } from 'framer-motion';
import logo1 from '../../../assets/marquee/logoipsum-389.png';
import logo2 from '../../../assets/marquee/logoipsum-392.png';
import logo3 from '../../../assets/marquee/logoipsum-397.png';
import logo4 from '../../../assets/marquee/logoipsum-399.png';

const logoMarquee = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo1,
    logo2,
    logo3,
    logo4,
];

const LogoTicker = () => {
    return (
        <>
            <div className='py-8 mx-auto max-w-3xl'>
                <div className='container'>
                    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
                        <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                duration: 12,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                            className='flex gap-10 flex-none'>
                            {logoMarquee?.map((item, i) => (
                                <img className='h-12 w-auto grayscale mr-5 md:mr-10' src={item} key={i} alt="brand logos" />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LogoTicker;
