// import React from 'react'
import ToastContext from "../../application/contexts/ToastContext";
import { useContext, useState } from "react";
import sign from '../../assets/Images/Sign.png';
import logo from '../../assets/Images/Logo.svg';
import GradientColor from "../../application/data/GradientColor.ts";
import { Icon } from '@iconify/react';
import { NavLink, useNavigate } from "react-router-dom";
import { userAuthentication } from "../../application/services.ts";

export default function SignUp() {
    const navigate = useNavigate();
    const toastManager = useContext(ToastContext);
    const { styles } = GradientColor()

    let [first_name, setFirst_name] = useState("");
    let [last_name, setLast_name] = useState("");
    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); 

    async function sign_up(ev: any) {
        ev.preventDefault();
        if (first_name.length == 0) {
            toastManager.alertError("First Name field is required");
            return;
        }
        if (last_name.length == 0) {
            toastManager.alertError("Last Name field is required");
            return;
        }
        if (username.length == 0) {
            toastManager.alertError("Username field is required");
            return;
        }
        if (email.length == 0) {
            toastManager.alertError("Email field is required");
            return;
        }

        if (password.length == 0) {
            toastManager.alertError("Email field is required");
            return;
        }

        const user = {
            username,
            first_name,
            last_name,
            email,
            password,
        };
        try {
            const response = await userAuthentication.signUp(user);
            if (response.status == "success") {
                toastManager.alertSuccess("Sign Up successfully");
                navigate("/sign-in");
            } else {
                toastManager.alertError(response.message || "");
            }
        } catch (error) {
            console.log(error);
            toastManager.alertError("Sign Up failed");

        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="bg-black w-full h-screen flex flex-col justify-center items-center">
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
                <div className="flex flex-col justify-center items-center mb-4 mt-1 ml-5">
                    <div className="w-12 h-12 overflow-hidden rounded-full flex justify-center items-center">
                        <Icon icon="mingcute:user-4-fill" className={` w-20 h-20 rounded-full ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`} />
                    </div>
                    <h1 className=" text-xl font-bold">Sign up</h1>
                </div>
                <form onSubmit={sign_up} className="pl-8 flex flex-col items-center ">
                    <div className="mb-1">
                        <div className="flex mb-2 justify-around items-center w-64 mx-auto">
                            <div className={`w-6 h-6 rounded-sm ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} flex justify-center items-center`}>
                                <Icon icon="ph:user-fill" style={{ color: "white" }} />
                            </div>
                            <input
                                type="text"
                                className="border outline-none  border-white rounded-2xl bg-transparent placeholder:text-white px-3 py-1 text-sm focus:ring-1 focus:ring-white ring-offset-1 transition-all duration-200"
                                placeholder="First name"
                                value={first_name}
                                onChange={(ev) => setFirst_name(ev.target.value)}
                            />
                        </div>
                        <div className="flex mb-2 justify-around items-center w-64 mx-auto">
                            <div className={`w-6 h-6 rounded-sm ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} flex justify-center items-center`}>
                                <Icon icon="ph:user-fill" style={{ color: "white" }} />
                            </div>
                            <input
                                type="text"
                                className="border outline-none  border-white rounded-2xl bg-transparent placeholder:text-white px-3 py-1 text-sm focus:ring-1 focus:ring-white ring-offset-1 transition-all duration-200"
                                placeholder="Last name"
                                value={last_name}
                                onChange={(ev) => setLast_name(ev.target.value)}

                            />
                        </div>
                        <div className="flex mb-2 justify-around items-center w-64 mx-auto">
                            <div className={`w-6 h-6 rounded-sm ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} flex justify-center items-center`}>
                                <Icon icon="heroicons:identification-16-solid" style={{ color: "white" }} />
                            </div>
                            <input
                                type="text"
                                className="border outline-none  border-white rounded-2xl bg-transparent placeholder:text-white px-3 py-1 text-sm focus:ring-1 focus:ring-white ring-offset-1 transition-all duration-200"
                                placeholder="Username"
                                value={username}
                                onChange={(ev) => setUsername(ev.target.value)}

                            />
                        </div>
                        <div className="flex mb-2 justify-around items-center w-64 mx-auto">
                            <div className={`w-6 h-6 rounded-sm ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} flex justify-center items-center`}>
                                <Icon icon="ic:baseline-email" style={{ color: "white" }} />
                            </div>
                            <input
                                type="text"
                                className="border outline-none   border-white rounded-2xl bg-transparent placeholder:text-white px-3 py-1 text-sm focus:ring-1 focus:ring-white ring-offset-1 transition-all duration-200"
                                placeholder="Email"
                                value={email}
                                onChange={(ev) => setEmail(ev.target.value)}
                            />
                        </div>
                        <div className="flex relative mb-3 justify-around items-center w-64 mx-auto">
                            <div className={`w-6 h-6 rounded-sm ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} flex justify-center items-center`}>
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

                    </div>
                    <div className="flex items-center justify-center w-80 ">
                        <button className={`px-2 py-1 rounded-xl w- text-xs font-bold shadow-lg ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} transition-transform  duration-300 active:scale-105`} type="submit">Create An Account</button>
                        <div className="flex flex-col justify-center mx-4 items-center">
                            <p className="" style={{ fontSize: "8px" }}>Already have account?</p>
                            <NavLink to='/sign-in' className=" font-bold underline" style={{ fontSize: "10px" }} >Sign in!</NavLink>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )


}