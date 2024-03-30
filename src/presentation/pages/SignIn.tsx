// import React from 'react'
import ToastContext from "../../application/contexts/ToastContext";
import { useContext } from "react";
import sign from '../../assets/Images/Sign.png';
import logo from '../../assets/Images/Logo.svg';
import GradientColor from "../components/GradiantColor";
import { Icon } from '@iconify/react';
import { NavLink } from "react-router-dom";

export default function SignIn() {
    const toastManager = useContext(ToastContext);
    const alertSuccessHandler = () => { toastManager.alertSuccess('Success Message') }
    const alertErroreHandler = () => { toastManager.alertError("Error Message"); }
    const alertInfoHandler = () => { toastManager.alertInfo("Info Message"); }
    const { styles } = GradientColor();


    return (
        <div className="container relative bg-black w-screen h-screen flex flex-col justify-center items-center">
            <div  className='mb-2'>
                <NavLink to='/'>
                <div className="flex justify-center items-center  p-5">
                        <img src={logo} alt="" className="w-10 h-10" />
                    <h1 className=" font-medium text-lg">Challenger mentality</h1>
                </div>
                </NavLink>
                <div className="flex flex-col justify-center items-center text-sm">
                    <h1 className=" font-medium text-xl">For Developers & Organizers</h1>
                    <p className=" opacity-90 ">Practice coding, events feature, and job opportunities.</p>
                </div>
            </div>
            <div className="w-1/2 h-5/6" style={{backgroundImage: `url('${sign}')`, backgroundSize: 'contain',backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>
                <div className="flex flex-col justify-center items-center mb-8 ">
                    <div className="w-14 h-14 overflow-hidden rounded-full flex justify-center items-center">
                        <Icon icon="mingcute:user-4-fill" className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}  w-20 h-20 rounded-full` } />
                    </div>
                    <h1 className=" text-xl font-bold ">Sign in</h1>
                </div>
                <form className="pl-8 flex flex-col items-center ">
                    <div className="mb-2">
                        <div className="flex flex-row mb-5 justify-around items-center w-64 mx-auto">
                            <div className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} w-6 h-6 rounded-sm flex justify-center items-center`}>
                                <Icon icon="ic:baseline-email"  style={{color: "white"}} />             
                            </div>
                            <input type="text" className="border-1.5 outline-none  border-white rounded-2xl bg-transparent placeholder:text-white px-3 py-1 text-sm" placeholder="Email" />
                        </div>
                        <div className="flex flex-row mb-5 justify-around items-center w-64 mx-auto">
                            <div className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} w-6 h-6 rounded-sm  flex justify-center items-center`}>
                                <Icon icon="mdi:password"  style={{color: "white"}} />                        
                            </div>
                            <input type="text" className="border-1.5 outline-none   border-white rounded-2xl bg-transparent placeholder:text-white px-3 py-1 text-sm" placeholder="Password" />
                        </div>
                        <div className="flex flex-row mb-5 justify-end items-center w-64 mx-auto">
                            <div className=" h-6 rounded-sm flex mr-5 justify-center items-center">
                                <input type="checkbox"/>
                                <p className="ml-1  text-xs">Remember me</p>
                            </div>
                            <a className=" underline font-normal" style={{fontSize:"10px"}} href="">Forgot password?</a>
                        </div>

                    </div>
                    <div className="flex items-center justify-center w-80  ">
                        <button className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} transition-transform  duration-300 active:scale-105 px-5 py-1 rounded-xl w- text-xs font-semibold  shadow-lg `} type="submit">LOGIN</button>
                        <div className="flex flex-col justify-center mx-4 items-center">
                            <p className="" style={{fontSize:"8px"}}>Don't have account?</p>
                            <a className=" font-semibold underline" style={{fontSize:"10px"}} href="">Sign up!</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    ) 


}