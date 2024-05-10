import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { cardVariants } from "../../../application/data/FramerVariants.ts";

function MyProgress() {

    const cardAnimationDelay = 0.1; 

  return (
    <div className="flex flex-col gap-8 py-5 pl-20 w-4/5">
        <div className='h-20'>
            <div className="font-semibold text-2xl">User Progress:</div>
            <h1 className="font-medium text-sm opacity-75">Track your progress in various levels</h1>
        </div>
        <div className="flex flex-wrap  w-full gap-5 justify-center">
            <motion.div
                className="bg-primary-blue bg-opacity-60 py-8 w-[36%] h-44 flex flex-col items-center justify-around  shadow-[0_0_10px_5px_rgba(32,32,156,0.5)] rounded-lg"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: cardAnimationDelay * 1}}
            >
                <div className="font-medium flex items-center gap-2 text-lg w-4/5 text-nowrap">
                    <Icon icon="mingcute:code-line" width="20" height="20" />
                    Challenges Submissions
                </div>
                <div className="w-3/5 flex justify-start gap-2">
                    <div className=" text-sm font-semibold w-16">Easy</div>
                    <div className="text-sm ">0/20  </div>
                </div>
                <div className="w-3/5 flex justify-start gap-2">
                    <div className=" text-sm font-semibold w-16">Medium</div>
                    <div className="text-sm">3/20</div>  
                </div>
                <div className="w-3/5 flex justify-start gap-2">
                    <div className=" text-sm font-semibold w-16">Hard</div>
                    <div className="text-sm">5/20</div>
                </div>
                <div className="w-3/5 flex justify-start gap-2">
                    <div className=" text-sm font-semibold w-16">Total</div>
                    <div className="text-sm">8/20</div> 
                </div>
            </motion.div>
            <motion.div
                className="bg-primary-blue bg-opacity-60 py-3 px-5 w-[36%] h-44 flex flex-col items-start justify-around  shadow-[0_0_10px_5px_rgba(32,32,156,0.5)] rounded-lg"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: cardAnimationDelay * 2 }}
            >
                <div className="w-full flex flex-col items-center text-lg">
                    <div className="font-medium flex items-center gap-2">
                        <Icon icon="mdi:events" className="text-xl" />
                        Events attendance
                    </div>
                    <div className=" text-sm font-bold">3 events</div>
                </div>
            </motion.div>
            <motion.div 
                className="bg-primary-blue bg-opacity-60 py-3 px-5 w-[36%]  h-44 flex flex-col items-start justify-around  shadow-[0_0_10px_5px_rgba(32,32,156,0.5)] rounded-lg"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: cardAnimationDelay * 3 }}    
            >
                <div className="w-full flex flex-col items-center">
                    <div className="font-medium flex items-center gap-2 text-lg">
                        <Icon icon="fluent-mdl2:work" className="text-xl" />
                        Job Posts Application
                    </div>
                    <div className=" text-sm font-bold text-nowrap">3 applications</div>
                </div>
            </motion.div>
            <motion.div 
                className="bg-primary-blue bg-opacity-60 py-3 px-5 w-[36%]  h-44 flex flex-col items-start justify-around  shadow-[0_0_10px_5px_rgba(32,32,156,0.5)] rounded-lg"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: cardAnimationDelay * 4 }}
            >
                <div className={`  flex flex-col gap-5 items-start px-10 py-5 rounded-lg font-semibold h-40 w-56 `}>
                    {/* 3 top events scores */}
                    <div className="font-medium flex items-center gap-2 text-lg text-nowrap">
                        <Icon icon="ic:outline-credit-score" width="20" height="20" />
                        Events scores
                    </div>
                    <div>
                        <div className="flex gap-6 justify-center">
                            <div className=" text-sm w-16">2nd</div>
                            <div className=" text-sm w-16">GCC</div>
                        </div>
                        <div className="flex gap-6 justify-center">
                            <div className=" text-sm w-16">7th</div>
                            <div className=" text-sm w-16">Co10</div>
                        </div>
                        <div className="flex gap-6 justify-center">
                            <div className=" text-sm w-16">26th</div>
                            <div className=" text-sm w-16">PyDay</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
        {/* <h1 className="font-semibold text-2xl">Scoreboard</h1> */}
        {/* <div className="flex w-full justify-between px-2 h-52 overflow-hidden">
            <div className="w-2/3 ">
                <div className="flex justify-between py-1 my-2 px-3 rounded-md ">
                    <div className=" text-sm w-24">USERNAME</div>
                    <div className=" text-sm w-24 ">RANK</div>
                    <div className=" text-sm w-24">1298000</div>
                </div>
                <hr className=' w-[95%] border-1  border-white '/>
                <div className="flex justify-between  py-1 my-2 px-3 rounded-md  ">
                    <div className=" text-sm w-24">Stanissk</div>
                    <div className=" text-sm w-24">128</div>
                    <div className=" text-sm w-24">1298000</div>
                </div>
                <div className="flex justify-between py-1 my-2 px-3 rounded-md  bg-white bg-opacity-15">
                    <div className=" text-sm w-24">Stanissk2</div>
                    <div className=" text-sm w-24">128</div>
                    <div className=" text-sm w-24">1298000</div>
                </div>
                <div className="flex justify-between py-1 my-2 px-3 rounded-md">
                    <div className=" text-sm w-24">Stanissk3</div>
                    <div className=" text-sm w-24">128</div>
                    <div className=" text-sm w-24">1298000</div>
                </div>
            </div>
      
        </div> */}
    </div>
    )
}

export default MyProgress