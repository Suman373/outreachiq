import AnimatedButton from "../../components/shared/misc/AnimatedButton";
import Navbar from "../../components/shared/Navbar";
import { BsArrowRight, BsPlayFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import packageJson from '../../../package.json';
import LogoTicker from "../../components/shared/misc/LogoTicker";
import productImg from '../../assets/product-image.png';
import Footer from "../../components/shared/misc/Footer";

const whychooseus = [
    {
        icon: "⚡",
        title: "Ease of Use",
        desc: "Get started in minutes, no steep learning curve."
    },
    {
        icon: "📈",
        title: "Scalable",
        desc: "Whether you’re a freelancer or a growing team, we grow with you."
    },
    {
        icon: "🤝",
        title: "Reliable Support",
        desc: "Dedicated help when you need it, not after."
    },
    {
        icon: "✅",
        title: "Proven Results",
        desc: "Tools designed to actually improve engagement and save time."
    },
    {
        icon: "💰",
        title: "Affordable Pricing",
        desc: "Transparent plans that don’t break the bank."
    },
    {
        icon: "⚙️",
        title: "Customizable",
        desc: "Tailor workflows and automation to fit your needs."
    }
];
const pricingTiers = [
    {
        title: "Free",
        monthlyPrice: 0,
        buttonText: "Get started for free",
        popular: false,
        inverse: false,
        features: [
            "Up to 100 emails/month",
            "1 automation flow",
            "Basic scheduling",
            "Community support",
            "10 AI-assisted text generation",
        ],
        slug: "/register"
    },
    {
        title: "Pro",
        monthlyPrice: 999,
        buttonText: "Sign up now",
        popular: true,
        inverse: true,
        features: [
            "Up to 1000 emails/month",
            "Unlimited automation flows",
            "Advanced scheduling & delays",
            "Priority support",
            "100 AI-assisted subject generations/month",
        ],
        slug: "/register"
    },
    {
        title: "Enterprise",
        monthlyPrice: 1999,
        buttonText: "Contact sales",
        popular: false,
        inverse: false,
        features: [
            "10,000 emails /month",
            "Team collaboration & roles",
            "Dedicated infrastructure",
            "Account managers",
            "Unlimited AI-assisted text generation",
        ],
        slug: "/contact-us"
    },
];

const Landing = () => {
    return (
        <> <Navbar />
            <section className="min-h-[100%] -mt-20 relative">
                <div className="">
                    {/* Hero */}
                    <div className="min-h-[100vh] flex flex-col gap-2 items-center justify-center container bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#b372cc,#ffff_60%)]">
                        <div className="text-base inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tighter ">Version {packageJson.version} is here
                        </div>
                        <div className="text-center">
                            <h1 className="text-4xl md:text-7xl font-medium my-2">Pathway To Successful Outreach</h1>
                            <p className="text-2xl my-2">The only end-to-end outreach solution</p>
                            <p className="text-xl my-2">Build email flows with AI assistance</p>
                        </div>
                        <div className="flex items-center mt-[30px] gap-5">
                            <AnimatedButton
                                primary="#691e87"
                                secondary="#000000"
                                textBeforeColor="#fff"
                                textAfterColor="#fff"
                                text={"Request a demo"}
                                icon={<BsArrowRight className="mt-1" />}
                            />
                            <AnimatedButton
                                style={{ border: '1px solid black' }}
                                primary="white"
                                secondary="transparent"
                                textBeforeColor="#000"
                                textAfterColor="#000"
                                text={"Watch a video"}
                                icon={<BsPlayFill className="mt-1 text-2xl" />}
                            />
                        </div>
                    </div>
                    {/* Brands */}
                    <div className="min-h-fit text-center py-4 container">
                        {/* <h1 className="text-xl md:text-3xl font-semibold">Brands Who Trust Us</h1> */}
                        <LogoTicker />
                    </div>
                    {/* Why Choose Us */}
                    <div className="min-h-fit w-full relative flex flex-col items-center justify-start container mb-10 md:mb-20">
                        <h1 className="text-center my-10">
                            <span className="section-h1">Why Choose Us</span>
                        </h1>
                        <p className="sub-heading">Trusted by professionals who care about results.</p>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-8">
                            {whychooseus.map((f, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                                    {/* <div className="text-4xl mb-4 grayscale">{f.icon}</div> */}
                                    <h3 className="text-xl text-brand font-semibold mb-2">{f.title}</h3>
                                    <p className="text-gray-600">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Showcase */}
                    <div className="h-[100vh] w-full relative flex flex-col items-center justify-start container">
                        <h1 className="text-center my-4 bg-white">
                            <span className="section-h1">A more effective way to automate your outreach emails</span>
                        </h1>
                        <p className="sub-heading bg-white">
                            Save hours of manual work with smart, personalized automation.
                        </p>
                        <div className='flex items-center justify-center relative'>
                            <img src={productImg} alt="product-image"
                                className='px-4 w-auto md:w-1/2' />
                            <div className="bg-dots"></div>
                        </div>

                    </div>
                    {/* How to use */}
                    <div className="min-h-[600px] w-full relative flex flex-col items-center justify-start container">
                        <h1 className="text-center my-10">
                            <span className="section-h1">Getting Started</span>
                        </h1>
                        <p className="sub-heading">Learn everything you need to launch, send, and track with ease.</p>
                    </div>
                    {/* Pricing */}
                    <div className="min-h-fit w-full relative flex flex-col items-center justify-start container">
                        <h1 className="text-center my-10">
                            <span className="section-h1">Pricing</span>
                        </h1>
                        <p className="sub-heading">Start free, scale as you grow.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-10">
                            {pricingTiers?.map((pricing, index) => (
                                <div className={!pricing.popular ? `p-10 border border-[#ffff] rounded-2xl shadow-[0_7px_14px_#EAEAEA]` : `p-10 border border-black bg-black shadow-md rounded-2xl text-white`} key={index}>
                                    <div className='flex justify-between items-center'>
                                        <h3 className={`text-lg font-bold ${!pricing.popular ? 'text-black/50' : 'text-white'}`}>{pricing.title}</h3>
                                        {pricing.popular && <div className='inline-flex text-sm px-2 by-2 rounded-xl border border-white/20'>
                                            <span className='bg-[linear-gradient(to_right,#dd7ddf,#e1cd86,#bbcb92,#71c2ef,#3bffff,#dd7ddf)] text-transparent bg-clip-text font-medium'>Popular</span>
                                        </div>}
                                    </div>
                                    <div className='flex items-baseline gap-1 mt-[30px]'>
                                        <span className='text-4xl font-bold tracking-tighter leading-none'>Rs.{pricing?.monthlyPrice}</span>
                                        <span className='tracking-tight font-bold text-black/50'>/month</span>
                                    </div>
                                    <ul className='flex flex-col gap-3 mt-[20px]'>
                                        {pricing?.features?.map((feature, fi) => (
                                            <li className='text-sm flex items-center gap-2 justify-start' key={fi}>
                                                <FaCheck className={`h-6 w-6 ${pricing.inverse ? "text-brandLight" : "text-brand"}`} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <a 
                                    href={pricing.slug}
                                    className={`cursor-pointer btn btn-primary w-full mt-[30px] ${pricing.popular && 'bg-white text-black'}`}>{pricing.buttonText}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
           <Footer/>
        </>
    )
}

export default Landing;