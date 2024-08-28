import profiles from '../../assets/Images/profiles.png';
import Landimg1 from '../../assets/Images/LandImg1.png';
import Landimg2 from '../../assets/Images/LandImg2.png';
import Landimg3 from '../../assets/Images/LandImg3.png';
import Landimg4 from '../../assets/Images/LandImg4.png';
import Landimg5 from '../../assets/Images/LandImg5.png';
import GradientColor from "../../application/data/GradientColor.ts";
import { Icon } from '@iconify/react';
import { NavLink } from "react-router-dom";
import InformationCard from "../components/InformationCard";
import logo from '../../assets/Images/Logo.svg';
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { arrowShapeImage } from '../../application/consts.ts';

export default function LandingPage() {
    const { styles } = GradientColor();

    // Ref and controls for each pair of elements
    const [ref1, inView1] = useInView();
    const controls1 = useAnimation();

    const [ref2, inView2] = useInView();
    const controls2 = useAnimation();

    const [ref3, inView3] = useInView();
    const controls3 = useAnimation();

    const [ref4, inView4] = useInView();
    const controls4 = useAnimation();

    useEffect(() => {
        if (inView1) {
            controls1.start({ opacity: 1, x: 0 });
        } else {
            controls1.start({ opacity: 0, x: -100 });
        }
    }, [inView1, controls1]);

    useEffect(() => {
        if (inView2) {
            controls2.start({ opacity: 1, x: 0 });
        } else {
            controls2.start({ opacity: 0, x: 100 });
        }
    }, [inView2, controls2]);

    useEffect(() => {
        if (inView3) {
            controls3.start({ opacity: 1, x: 0 });
        } else {
            controls3.start({ opacity: 0, x: -100 });
        }
    }, [inView3, controls3]);

    useEffect(() => {
        if (inView4) {
            controls4.start({ opacity: 1, x: 0 });
        } else {
            controls4.start({ opacity: 0, x: 100 });
        }
    }, [inView4, controls4]);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex flex-col md:flex-row">
                <div className="md:w-1/2 w-full py-10">
                    <div className='mt-8 mb-4 w-full md:w-2/3'>
                        <h1 className="text-gray-50 font-semibold text-2xl leading-8">
                            Start Your Coding Adventure Open Challenges, Limitless Growth
                        </h1>
                        <h2 className="text-sm text-gray-400 py-2 leading-5">
                            Begin your coding journey with our open challenges,
                            offering endless opportunities for skill
                            enhancement and career advancement.
                        </h2>
                    </div>
                    <div className="md:w-fit w-full flex items-center mb-4 py-4 rounded-lg">
                        <img src={profiles} alt="" className="h-8" />
                        <p className="ml-4 text-xs text-gray-400">
                            Join 780,900 Developers Engaged in Learning,<br />
                            Collaboration, and Growth
                        </p>
                    </div>
                    <NavLink to="/sign-up" className="w-fit">
                        <div className="md:w-fit w-full text-center select-none bg-primary-yellow bg-opacity-80 font-medium px-16 py-2 rounded-lg hover:bg-yellow-700 duration-300 active:scale-105">Join Us Today</div>
                    </NavLink>
                </div>
                <div className="flex flex-col items-end w-full md:w-1/2">
                    <div className="w-full h-full flex flex-col items-end justify-end" >
                        <div className='w-fit relative'>
                            <div className="w-80 md:absolute bottom-1/3 right-1/2">
                                <button className={`absolute z-10 -top-4 left-4 ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} p-2 opacity-70 rounded-md`}><Icon icon="ph:code-duotone" style={{ color: "white" }} /></button>
                                <img src={Landimg1} className="md:w-full w-60" />
                            </div>
                            <img src={Landimg2} className="w-40 md:w-80 absolute md:static top-1/2 left-1/2" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-col items-center'>
                <img src={arrowShapeImage} className='w-full' />
            </div>
            <div className='w-full flex flex-col md:flex-row items-center justify-center flex-wrap'>
                {
                    features.map((feature, index) => {
                        return (
                            <div className='md:w-1/3 w-full flex flex-col items-center mb-4'>
                                <div className='w-11/12 flex flex-col items-center'>
                                    <InformationCard key={index} feature={feature} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="w-full flex flex-col justify-center items-center mt-10">
                <motion.h1
                    ref={ref1}
                    initial={{ opacity: 0, x: -100 }}
                    animate={controls1}
                    transition={{ duration: 0.5 }}
                    className="inline-block text-3xl text-center font-bold mb-5"
                >
                    Tech hiring is evolving
                </motion.h1>
                <motion.h1
                    ref={ref1}
                    initial={{ opacity: 0, x: -100 }}
                    animate={controls1}
                    transition={{ duration: 0.5 }}
                    className="inline-block text-md opacity-90 font-md text-center"
                >
                    Tech hiring needs a reset. Instead of the traditional route, <br /> let’s empower developers with the right tools.
                </motion.h1>
            </div>
            <div className="flex flex-col md:flex-row w-full justify-around md:gap-[24rem] items-center p-10">
                <motion.div
                    ref={ref2}
                    initial={{ opacity: 0, x: 100 }}
                    animate={controls2}
                    transition={{ duration: 0.5 }}
                    className="md:w-1/4"
                >
                    <h1 className="font-semibold text-xl text-center mb-3">Take part in the challenges</h1>
                    <p className="text-center">Sharpen your skills by solving real-world problems, Understand the fundamentals and connect with the tech community.</p>
                </motion.div>
                <motion.img
                    ref={ref2}
                    initial={{ opacity: 0, x: 100 }}
                    animate={controls2}
                    transition={{ duration: 0.5 }}
                    src={Landimg3}
                    alt=""
                />
            </div>
            <div className="flex flex-col md:flex-row w-full  justify-around md:gap-[16rem] items-center py-10  ">
                <motion.img
                    ref={ref3}
                    initial={{ opacity: 0, x: -100 }}
                    animate={controls3}
                    transition={{ duration: 0.5 }}
                    src={Landimg4}
                    alt=""
                    className=" scale-75 "
                />
                <motion.div
                    ref={ref3}
                    initial={{ opacity: 0, x: -100 }}
                    animate={controls3}
                    transition={{ duration: 0.5 }}
                    className="md:w-1/4 mr-1">
                    <h1 className="font-semibold text-xl text-center mb-3">Create job opportunities</h1>
                    <p className=" text-center"> Stay updated with the latest hiring trends and job openings in the tech industry.Companies like EY, HCL tech, Google, and HBE are actively hiring.</p>
                </motion.div>
            </div>
            <div className="flex flex-col md:flex-row w-full  justify-around md:gap-[20rem] items-center p-10">
                <motion.div
                    ref={ref4}
                    initial={{ opacity: 0, x: 100 }}
                    animate={controls4}
                    transition={{ duration: 0.5 }}
                    className="md:w-1/4">
                    <h1 className="font-semibold text-xl text-center mb-3">Coding challenge events</h1>
                    <p className=" text-center">Events are exciting opportunities for developers to showcase their skills and learn</p>
                </motion.div>
                <motion.img
                    ref={ref4}
                    initial={{ opacity: 0, x: 100 }}
                    animate={controls4}
                    transition={{ duration: 0.5 }}
                    src={Landimg5} alt=""
                    className=" scale-75" />
            </div>
            <div className={`w-full my-10 rounded-3xl py-5 md:p-10 flex flex-col items-center justify-center ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`} style={{ backgroundImage: `linear-gradient(to bottom, rgba(33, 32, 156, 0.3), rgba(253, 184, 39, 0.3))` }}>
                <img src={logo} alt="" className="w-52 my-2" />
                <h1 className="my-2 text-center">Practice coding challenges & Discuss with programmers</h1>
                <h1 className="my-2 text-center">Public Challenge Discourse enables open discussions within the <br /> project and idea exchange.</h1>
                <NavLink to={''} className='flex items-center border hover:scale-105 transition-transform duration-1000 active:scale-110 hover:bg-white hover:text-black border-white px-4 md:px-16 py-2 rounded-xl my-2 '>
                    Discover our challenges world
                    <Icon icon="tabler:arrow-right" style={{ margin: "5px", }} />
                </NavLink>
                <NavLink to={''} className={`underline my-2 hover:opacity-85 transition-all duration-300`}>Learn more  </NavLink>
            </div>
        </div>
    )
}

const features: FeatureCard[] = [
    {
        title: "Host Your Coding Events",
        description: "Empower your company or club to organize engaging coding challenges and events. Reach talented individuals and foster a vibrant tech community.",
        call_to_action: "Host an Event",
        icon: <Icon icon="mdi:event-star" />
    },
    {
        title: "Join Public Coding Challenges",
        description: "Participate in exciting coding challenges open to everyone. Collaborate, compete, and learn from fellow enthusiasts in our vibrant challenge community.",
        call_to_action: "Explore Challenges",
        icon: <Icon icon="ph:code-fill" />
    },
    {
        title: "Engage in Discussions",
        description: "Discuss solutions, share insights, and connect with peers in our dynamic challenge comments section. Amplify your learning and expand your network.",
        call_to_action: "Join the Discussion",
        icon: <Icon icon="mdi:discussion" />
    },
    {
        title: "Discover Job Opportunities",
        description: "Explore a wide range of job postings from top companies. Take the next step in your career journey and find your dream tech job.",
        call_to_action: "Browse Jobs",
        icon: <Icon icon="material-symbols:work" />
    },
    {
        title: "Build Your Tech Community",
        description: "Connect with like-minded individuals, expand your network, and stay updated on the latest trends and opportunities in the tech industry.",
        call_to_action: "Join the Community",
        icon: <Icon icon="fluent:people-community-16-filled" />
    }
];