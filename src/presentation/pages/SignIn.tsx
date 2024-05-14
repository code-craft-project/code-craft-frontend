// import React from 'react'
import ToastContext from "../../application/contexts/ToastContext";
import { useContext, useState } from "react";
import sign from '../../assets/Images/Sign.png';
import logo from '../../assets/Images/Logo.svg';
import GradientColor from "../../application/data/GradientColor.ts";
import { Icon } from '@iconify/react';
import { NavLink, useNavigate } from "react-router-dom";
import { userAuthentication } from "../../application/services.ts";
import UserSessionContext from "../../application/contexts/UserSessionContext.ts";

export default function SignIn() {
    const toastManager = useContext(ToastContext);
    const { signIn } = useContext(UserSessionContext);
    const { styles } = GradientColor();
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    async function sign_in(ev: any) {
        ev.preventDefault();
        if (email.length > 0 && password.length > 0) {
            const user = {
                email,
                password,
            };
            try {
                const response = await userAuthentication.signIn(user);
                if (response.status == "success") {
                    toastManager.alertSuccess("Sign In successfully");
                    setTimeout(() => {
                        signIn(response.data);
                        navigate("/home");
                    }, 1000);
                } else {
                    console.error('Sign In failed:', response.message);
                    toastManager.alertError(response.message || "Sign In Failed");
                }
            } catch (error) {
                console.log(error);
                toastManager.alertError("Sign In  failed");
            }
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full relative bg-black h-screen flex flex-col justify-center items-center">
            <div className='mb-2'>
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
            <div className="w-1/2 h-5/6" style={{ backgroundImage: `url('${sign}')`, backgroundSize: 'contain', backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
                <div className="flex flex-col justify-center items-center mb-8 mt-1 ml-5">
                    <div className="w-14 h-14 overflow-hidden rounded-full flex justify-center items-center">
                        <Icon icon="mingcute:user-4-fill" className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}  w-20 h-20 rounded-full`} />
                    </div>
                    <h1 className=" text-xl font-bold ">Sign in</h1>
                </div>
                <form onSubmit={sign_in} className="pl-8 flex flex-col items-center ">
                    <div className="mb-2">
                        <div className="flex  mb-5 justify-around items-center w-64 mx-auto">
                            <div className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} w-6 h-6 rounded-sm flex justify-center items-center`}>
                                <Icon icon="ic:baseline-email" style={{ color: "white" }} />
                            </div>
                            <input
                                type="text"
                                className="border outline-none  border-white rounded-2xl bg-transparent placeholder:text-white px-3 py-1 text-sm focus:ring-1 focus:ring-white  ring-offset-1 transition-all duration-200"
                                placeholder="Email"
                                value={email}
                                onChange={(ev) => setEmail(ev.target.value)}
                            />
                        </div>
                        <div className="flex relative mb-5 justify-around items-center w-64 mx-auto">
                            <div className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} w-6 h-6 rounded-sm  flex justify-center items-center`}>
                                <Icon icon="mdi:password" style={{ color: "white" }} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="border outline-none border-white rounded-2xl bg-transparent placeholder:text-white px-3 py-1 text-sm focus:ring-1 focus:ring-white ring-offset-1 transition-all duration-200"
                                placeholder="Password"
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                            />
                            <button
                                type="button"
                                className="rounded-full focus:outline-none absolute top-1/2 right-3 transform -translate-y-1/2 mr-2"
                                onClick={toggleShowPassword}
                            >
                                {showPassword ? (
                                    <Icon icon="zondicons:view-show" width="16" height="16" style={{ color: "white" }} /> // Show icon when password is hidden
                                ) : (
                                    <Icon icon="ep:hide" width="16" height="16" style={{ color: "white" }} /> // Hide icon when password is visible
                                )}
                            </button>
                        </div>
                        <div className="flex  mb-5 justify-center items-center ml-10 mx-auto">
                            <div className=" h-6 rounded-sm flex mr-5 justify-center items-center">
                                <input type="checkbox" className="accent-primary-yellow" />
                                <p className="ml-1  text-xs">Remember me</p>
                            </div>
                            <a className=" underline font-normal" style={{ fontSize: "10px" }} href="">Forgot password?</a>
                        </div>

                    </div>
                    <div className="flex items-center justify-center w-80  ">
                        <button className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} transition-transform  duration-300 active:scale-105 px-5 py-1 rounded-xl w- text-xs font-bold  shadow-lg `} type="submit">LOGIN</button>
                        <div className="flex flex-col justify-center mx-4 items-center">
                            <p className="" style={{ fontSize: "8px" }}>Don't have account?</p>
                            <NavLink to='/sign-up' className=" font-bold underline" style={{ fontSize: "10px" }} >Sign up!</NavLink>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )


}