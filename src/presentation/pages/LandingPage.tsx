// import { useContext } from "react";
// import ToastContext from "../../application/contexts/ToastContext";
import profiles from '../../assets/Images/profiles.png';
import Landimg1 from '../../assets/Images/LandImg1.png';
import Landimg2 from '../../assets/Images/LandImg2.png';
import Landimg3 from '../../assets/Images/LandImg3.png';
import Landimg4 from '../../assets/Images/LandImg4.png';
import Landimg5 from '../../assets/Images/LandImg5.png';
import GradientColor from "../components/GradiantColor";
import { Icon } from '@iconify/react';
import { NavLink } from "react-router-dom";
import InformationCard from "../components/InformationCard";
import logo from '../../assets/Images/Logo.svg';

export default function LandingPage() {
    // const toastManager = useContext(ToastContext);
    const { styles } = GradientColor();

    // const alertSuccessHandler = () => { toastManager.alertSuccess("Success Message"); }
    // const alertErroreHandler = () => { toastManager.alertError("Error Message"); }
    // const alertInfoHandler = () => { toastManager.alertInfo("Info Message"); }

    return (
        <div className="flex flex-col items-center ">
            <div className="flex mt-14">
                <div className=" w-1/2 p-10 mt-10">
                    <h1 className="font-semibold text-2xl my-8">Talk is cheap. Show me the code</h1>
                    <h2 className="font-meduim text-xl opacity-75 mb-8">Take your code to the next level through quality <br/> code review by our expert engineers. Learn <br /> problem solving with our coding world</h2>
                    <div className="flex justify-around items-center mb-8 bg-white bg-opacity-30 w-[30rem] py-4 ">
                        <img src={profiles} alt="" className="w-28 h-11 "/>
                        <p className="text-xs font-medium">Join 780,900 developers building projects, <br /> reviewing code, and helping each other improve.</p>
                    </div>
                    <div className="flex justify-between w-[30rem]">
                        <div className="flex ">
                            <input type="text" placeholder="Quick Search" className=" bg-white rounded-l-sm px-8 w-[20rem] py-2 text-black outline-none"/>
                            <Icon icon="iconoir:search"  style={{color: "black "}}   className="bg-white rounded-r-sm flex h-10 w-10 px-3 cursor-pointer"/>
                        </div>
                        <NavLink to="/sign_in" className="bg-primary-yellow bg-opacity-80 font-meduim px-4 py-2 rounded-sm">Get Started</NavLink>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-center w-1/2 p-10">
                    <div className="w-1/2 h-52 relative mt-16" >
                        <button className={`absolute bottom-48 z-10 left-8 ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} p-2 opacity-70 rounded-md`}><Icon icon="ph:code-duotone"  style={{color: "white"}} /></button>
                        <img src={Landimg1} alt="" className=" scale-80 "/>
                        <img src={Landimg2} alt="" className="absolute top-1/2 left-1/4 scale-60    "/>
                    </div>
                </div>
            </div>
            <div className="py-28 w-[90%] px-12 flex items-center justify-between mt-32 relative">
                <div className="absolute top-0 left-[49.95%] h-2 w-80 bg-primary-yellow bg-opacity-60   "></div>
                <div className="absolute bottom-96 left-[77%] h-56 w-2 bg-primary-yellow bg-opacity-60   "></div>
                <div className="absolute bottom-[21.3rem] left-[74%] rounded-full h-20 w-20 bg-primary-yellow opacity-30 flex justify-center items-center"></div>
                <div className="absolute bottom-[22.8rem] left-[75.5%] h-10 w-10 rounded-full bg-primary-yellow opacity-50 flex justify-center items-center"></div>
                <div className="absolute bottom-[23.8rem] left-[77%] h-2 w-2 rounded-full bg-primary-yellow" style={{boxShadow:"0px 2px 10px 1px rgb(0,0,0,.8)"}}></div>
                <Icon icon="formkit:arrowdown" width='120' height='120'  className="absolute bottom-[17.9rem]   left-[44.5%] text-primary-yellow opacity-60" />
                <InformationCard  title="Code Review" text="Online IDE and professional reviewers."/>
                <InformationCard  title="Job Opportunities" text="Every company is a tech company.We’re here "/>
                <InformationCard  title="Real-time Discussion" text="Discuss anytime with our community"/>
            </div>
            <div className="flex flex-col items-center mt-10">
                <h1 className="inline-block text-3xl font-bold mb-5"> Tech hiring is evolving</h1>
                <h1 className="inline-block text-md opacity-90 font-md text-center"> Tech hiring needs a reset. Instead of the traditional route, <br /> let’s empower developers with the right tools.</h1>
            </div>
            <div className="flex w-full  justify-around gap-[24rem] items-center p-10">
                <div className="w-1/4">
                    <h1 className="font-semibold text-xl text-center mb-3">Take part in the challenges</h1>
                    <p className=" text-center"> Sharpen your skills by solving real-world problems, Understand the fundamentals and connect with the tech community. </p>
                </div>
                <img src={Landimg3} alt="" />
            </div>
            <div className="flex w-full  justify-around gap-[16rem] items-center py-10  ">
                <img src={Landimg4} alt="" className=" scale-75 "/>
                <div className="w-1/4 mr-1">
                    <h1 className="font-semibold text-xl text-center mb-3">Create job opportunities</h1>
                    <p className=" text-center">  Stay updated with the latest hiring trends and job openings in the tech industry. Companies like EY, HCL tech, Google, and HBE are actively hiring. </p>
                </div>
            </div>
            <div className="flex w-full  justify-around gap-[20rem] items-center p-10">
                <div className="w-1/4">
                    <h1 className="font-semibold text-xl text-center mb-3">Coding challenge events</h1>
                    <p className=" text-center">   Events are exciting opportunities for developers to showcase their skills and learn </p>
                </div>
                <img src={Landimg5} alt="" className=" scale-75"/>
            </div>
            <div className={`w-[1150px] h-[500px] my-10 rounded-3xl p-10 flex flex-col items-center justify-center ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`} style={{ backgroundImage: `linear-gradient(to bottom, rgba(33, 32, 156, 0.3), rgba(253, 184, 39, 0.3))` }}>
                <img src={logo} alt="" className="w-52 my-2" />
                <h1 className="my-2 text-center">Practice coding challenges & Discuss with programmers</h1>
                <h1 className="my-2 text-center">Public Challenge Discourse enables open discussions within the <br /> project and idea exchange.</h1>
                <NavLink to={''} className='flex items-center border hover:scale-105 transition-transform duration-500 active:scale-110 hover:bg-white hover:text-black border-white px-16 py-2 rounded-xl my-2 '>
                    Discover our challenges world  
                    <Icon icon="tabler:arrow-right" className="hover:text-black text-white"  style={{ margin: "5px",}} />
                </NavLink>
                <NavLink to={''} className={`underline my-2 hover:opacity-85 transition-all duration-300`}>Learn more  </NavLink>
            </div>
        </div>
    )
}

// const styles2 = {
//     container: "w-full h-screen overflow-auto bg-black flex justify-around items-center",
//     btn: "px-16 py-2 rounded-lg text-white",
//     btn_info: "bg-yellow-600",
//     btn_success: "bg-green-600",
//     btn_error: "bg-red-600",
// };

