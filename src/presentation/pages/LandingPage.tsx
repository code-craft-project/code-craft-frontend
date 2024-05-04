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
            <div className="w-full flex mt-14">
                <div className="w-1/2 py-10">
                    <div>
                        <h1 className="font-semibold text-2xl mt-8">Talk is cheap. Show me the code</h1>
                        <h2 className="font-normal text-lg opacity-75 mb-8">Take your code to the next level through quality <br /> code review by our expert engineers. Learn <br /> problem solving with our coding world</h2>
                    </div>
                    <div className="flex justify-around items-center mb-8 bg-white bg-opacity-20 w-[30rem] py-4 ">
                        <img src={profiles} alt="" className="w-28 h-11 " />
                        <p className="text-xs font-medium">Join 780,900 developers building projects, <br /> reviewing code, and helping each other improve.</p>
                    </div>
                    <div className="flex justify-between w-[30rem]">
                        <div className="flex relative rounded-sm">
                            <input type="text" placeholder="Quick Search" className=" bg-white rounded-sm px-8 w-[22rem] py-2 text-black outline-primary-yellow" />
                            <NavLink to='/search' className=' cursor-pointer absolute right-0 rounded-sm'>
                                <Icon icon="iconoir:search" className=" h-11 w-11 px-3 text-primary-yellow rounded-sm" />
                            </NavLink>
                        </div>
                        <NavLink to="/sign-in" className="bg-primary-yellow bg-opacity-80 font-medium px-4 py-2 rounded-sm">Get Started</NavLink>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-center w-1/2 py-10">
                    <div className="w-1/2 relative mt-16" >
                        <button className={`absolute bottom-48 z-10 left-8 ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} p-2 opacity-70 rounded-md`}><Icon icon="ph:code-duotone" style={{ color: "white" }} /></button>
                        <button className={`absolute top-60 z-10 left-32  bg-gradient-to-b from-white from-50% to-transparent to-90% text-slate-400 font-semibold  p-1 opacity-70 rounded-md`}>Explore</button>
                        <img src={Landimg1} alt="" className=" scale-80 " />
                        <img src={Landimg2} alt="" className="absolute top-1/2 left-1/4 scale-60    " />
                    </div>
                </div>
            </div>
            <div className="py-28 w-full flex items-center justify-between mt-32 relative">
                <div className="absolute top-0 left-[49.95%] h-2 w-80 bg-primary-yellow bg-opacity-60 z-50"></div>
                <div className="absolute bottom-96 left-[77%] h-36 w-2 bg-primary-yellow bg-opacity-60 "></div>
                <div className="absolute bottom-[21.3rem] left-[74%] rounded-full h-20 w-20 bg-primary-yellow opacity-30 flex justify-center items-center"></div>
                <div className="absolute bottom-[22.8rem] left-[75.5%] h-10 w-10 rounded-full bg-primary-yellow opacity-100 flex justify-center items-center"></div>
                <div className="absolute bottom-[23.4rem] left-[76.5%] h-4 w-4 rounded-full bg-primary-yellow" style={{ boxShadow: "0px 2px 10px 1px rgb(0,0,0,.8)" }}></div>
                <Icon icon="formkit:arrowdown" width='120' height='120' className="absolute bottom-[17.9rem]   left-[44.5%] text-primary-yellow opacity-60" />
                <InformationCard title="Code Review" text="Online IDE and professional reviewers." />
                <InformationCard title="Job Opportunities" text="Every company is a tech company. We’re here " />
                <InformationCard title="Real-time Discussion" text="Discuss anytime with our community" />
            </div>
            <div className="w-full flex flex-col items-center mt-10">
                <motion.h1
                    ref={ref1}
                    initial={{ opacity: 0, x: -100 }}
                    animate={controls1}
                    transition={{ duration: 0.5 }}
                    className="inline-block text-3xl font-bold mb-5"
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
            <div className="flex w-full justify-around gap-[24rem] items-center p-10">
                <motion.div
                    ref={ref2}
                    initial={{ opacity: 0, x: 100 }}
                    animate={controls2}
                    transition={{ duration: 0.5 }}
                    className="w-1/4"
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
            <div className="flex w-full  justify-around gap-[16rem] items-center py-10  ">
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
                    className="w-1/4 mr-1">
                    <h1 className="font-semibold text-xl text-center mb-3">Create job opportunities</h1>
                    <p className=" text-center"> Stay updated with the latest hiring trends and job openings in the tech industry.Companies like EY, HCL tech, Google, and HBE are actively hiring.</p>
                </motion.div>
            </div>
            <div className="flex w-full  justify-around gap-[20rem] items-center p-10">
                <motion.div
                    ref={ref4}
                    initial={{ opacity: 0, x: 100 }}
                    animate={controls4}
                    transition={{ duration: 0.5 }}
                    className="w-1/4">
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
            <div className={`w-full my-10 rounded-3xl p-10 flex flex-col items-center justify-center ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`} style={{ backgroundImage: `linear-gradient(to bottom, rgba(33, 32, 156, 0.3), rgba(253, 184, 39, 0.3))` }}>
                <img src={logo} alt="" className="w-52 my-2" />
                <h1 className="my-2 text-center">Practice coding challenges & Discuss with programmers</h1>
                <h1 className="my-2 text-center">Public Challenge Discourse enables open discussions within the <br /> project and idea exchange.</h1>
                <NavLink to={''} className='flex items-center border hover:scale-105 transition-transform duration-1000 active:scale-110 hover:bg-white hover:text-black border-white px-16 py-2 rounded-xl my-2 text'>
                    Discover our challenges world
                    <Icon icon="tabler:arrow-right" style={{ margin: "5px", }} />
                </NavLink>
                <NavLink to={''} className={`underline my-2 hover:opacity-85 transition-all duration-300`}>Learn more  </NavLink>
            </div>
        </div>
    )
}
