import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { cardVariants } from "../../../application/data/FramerVariants.ts";
import { useContext } from "react";
import UserSessionContext from "../../../application/contexts/UserSessionContext.ts";

function MyProgress() {

    const cardAnimationDelay = 0.1;
    const userSession = useContext(UserSessionContext);
    return (
        <div className="flex flex-col gap-8 py-5 md:pl-20 w-full md:w-4/5">
            <div className='h-20'>
                <div className="font-semibold text-2xl">User Progress:</div>
                <h1 className="font-medium text-sm opacity-75">Track your progress in various levels</h1>
            </div>
            <div className="flex flex-wrap w-full gap-5 justify-start">
                <motion.div
                    className="bg-primary-blue bg-opacity-60 py-4 w-full md:w-[34%] h-48 flex flex-col items-center justify-around  shadow-[0_0_10px_5px_rgba(32,32,156,0.5)] rounded-lg"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: cardAnimationDelay * 1 }}
                >
                    <div className="font-medium flex items-center justify-center gap-2 text-lg w-full text-nowrap">
                        <Icon icon="mingcute:code-line" width="20" height="20" />
                        Challenges Submissions
                    </div>
                    <div className="w-full flex flex-col">
                        <div className="w-full flex justify-around gap-2">
                            <div className=" text-sm font-semibold w-16">Easy</div>
                            <div className="text-sm ">{userSession.userProgress.correct_easy_submissions}/{userSession.userProgress.total_easy_submissions}  </div>
                        </div>
                        <div className="w-full flex justify-around gap-2">
                            <div className=" text-sm font-semibold w-16">Medium</div>
                            <div className="text-sm">{userSession.userProgress.correct_medium_submissions}/{userSession.userProgress.total_medium_submissions}</div>
                        </div>
                        <div className="w-full flex justify-around gap-2">
                            <div className=" text-sm font-semibold w-16">Hard</div>
                            <div className="text-sm">{userSession.userProgress.correct_hard_submissions}/{userSession.userProgress.total_hard_submissions}</div>
                        </div>
                        <div className="w-full flex justify-around gap-2 mt-2">
                            <div className=" text-sm font-semibold w-16">Total</div>
                            <div className="text-sm">{userSession.userProgress.total_correct_submissions}/{userSession.userProgress.total_submissions}</div>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="bg-primary-blue bg-opacity-60 py-6 w-full md:w-[34%]  h-48 flex flex-col items-start justify-around  shadow-[0_0_10px_5px_rgba(32,32,156,0.5)] rounded-lg"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: cardAnimationDelay * 3 }}
                >
                    <div className={`flex flex-col gap-5 items-start px-8 justify-around  rounded-lg font-semibold h-40 w-full `}>
                        {/* 3 top events scores */}
                        <div className="font-medium flex items-center gap-2 text-lg">
                        <Icon icon="ri:calendar-todo-line" width="32" height="32" />
                        Engagement & Opportunity Tracker
                        </div>
                        <div className="w-full flex flex-col justify-between">
                            <div className="flex gap-6 justify-between w-full mb-2">
                                <div className="flex text-sm w-40">
                                    <Icon icon="clarity:event-solid" width="18" height="18" className="mr-2"/>Events attendance
                                </div>
                                <div className=" text-sm w-16"> 273</div>
                            </div>
                            <div className="flex gap-6 justify-between w-full">
                                <div className=" text-sm flex w-40"><Icon icon="clarity:employee-solid" width="18" height="18" className="mr-2"/>Job Applications</div>
                                <div className=" text-sm w-16">283</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="bg-primary-blue bg-opacity-60 py-6 w-full md:w-[34%]  h-48 flex flex-col items-start justify-around  shadow-[0_0_10px_5px_rgba(32,32,156,0.5)] rounded-lg"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: cardAnimationDelay * 4 }}
                >
                    <div className={`flex flex-col gap-5 items-start px-8 justify-around  rounded-lg font-semibold h-40 w-full `}>
                        {/* 3 top events scores */}
                        <div className="font-medium flex items-center gap-2 text-lg text-nowrap">
                            <Icon icon="material-symbols:leaderboard" width="20" height="20" />
                            ScoreBoard
                        </div>
                        <div className="w-full flex flex-col justify-between">
                            <div className="flex gap-6 justify-between w-full">
                                <div className=" text-sm w-16">2nd</div>
                                <div className=" text-sm w-16">GCC</div>
                            </div>
                            <div className="flex gap-6 justify-between w-full">
                                <div className=" text-sm w-16">7th</div>
                                <div className=" text-sm w-16">Co10</div>
                            </div>
                            <div className="flex gap-6 justify-between w-full">
                                <div className=" text-sm w-16">26th</div>
                                <div className=" text-sm w-16">PyDay</div>
                            </div>
                            <div className="flex gap-6 justify-between w-full">
                                <div className=" text-sm w-16">26th</div>
                                <div className=" text-sm w-16">PyDay</div>
                            </div>
                            <div className="flex gap-6 justify-between w-full">
                                <div className=" text-sm w-16">26th</div>
                                <div className=" text-sm w-16">PyDay</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default MyProgress