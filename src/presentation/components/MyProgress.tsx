import GradientColor from "../../application/data/GradientColor.ts";

function MyProgress() {
    const {styles} = GradientColor()

  return (
    <div className="flex flex-col gap-8 py-5 px-20 w-4/5">
        <div className="flex py-14 justify-between w-[99%]">
            <div className="bg-primary-blue bg-opacity-60 py-8 px-10 w-[17rem] h-36 flex flex-col items-start justify-around  shadow-[0_0_10px_5px_rgba(32,32,156,0.5)] rounded-lg">
                <div className="w-full flex justify-start gap-2">
                    <span className=" text-sm font-semibold w-16">Easy</span>
                    <span className="text-sm ">0/20  </span>
                </div>
                <div className="w-full flex justify-start gap-2">
                    <span className=" text-sm font-semibold w-16">Meduim</span>
                    <span>3/20</span>  
                </div>
                <div className="w-full flex justify-start gap-2">
                    <span className=" text-sm font-semibold w-16">Hard</span>
                    <span className="text-sm">5/20</span>
                </div>
                <div className="w-full flex justify-start gap-2">
                    <span className=" text-sm font-semibold w-16">Total</span>
                    <span className="text-sm">8/20</span> 
                </div>
            </div>
            <div className="bg-primary-blue bg-opacity-60 py-3 px-5 w-[17rem] h-36 flex flex-col items-start justify-around  shadow-[0_0_10px_5px_rgba(32,32,156,0.5)] rounded-lg">
                <div className="w-full flex flex-col items-center">
                    <span>Event attendance</span>
                    <span className=" text-sm font-bold">3 events</span>
                </div>
            </div>
            <div className="bg-primary-blue bg-opacity-60 py-3 px-5 w-[17rem] h-36 flex flex-col items-start justify-around  shadow-[0_0_10px_5px_rgba(32,32,156,0.5)] rounded-lg">
                <div className="w-full flex flex-col items-center">
                    <span>Jobs Post Application</span>
                    <span className=" text-sm font-bold text-nowrap">3 applications</span>
                </div>
            </div>
        </div>
        <h1 className="font-semibold text-2xl">Scoreboard</h1>
        <div className="flex w-full justify-between px-2 h-52 overflow-hidden">
            <div className="w-2/3 ">
                <div className="flex justify-between py-1 my-2 px-3 rounded-md ">
                    <span className=" text-sm w-24">USERNAME</span>
                    <span className=" text-sm w-24 ">RANK</span>
                    <span className=" text-sm w-24">1298000</span>
                </div>
                <hr className=' w-[95%] border-1  border-white '/>
                <div className="flex justify-between  py-1 my-2 px-3 rounded-md  ">
                    <span className=" text-sm w-24">Stanissk</span>
                    <span className=" text-sm w-24">128</span>
                    <span className=" text-sm w-24">1298000</span>
                </div>
                <div className="flex justify-between py-1 my-2 px-3 rounded-md  bg-white bg-opacity-15">
                    <span className=" text-sm w-24">Stanissk2</span>
                    <span className=" text-sm w-24">128</span>
                    <span className=" text-sm w-24">1298000</span>
                </div>
                <div className="flex justify-between py-1 my-2 px-3 rounded-md">
                    <span className=" text-sm w-24">Stanissk3</span>
                    <span className=" text-sm w-24">128</span>
                    <span className=" text-sm w-24">1298000</span>
                </div>
            </div>
            <div className="flex gap-5 ">
                <div className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} flex flex-col gap-5 items-start px-10 py-5 rounded-lg font-semibold h-40 w-56 shadow-md shadow-primary-yellow`}>
                    <div>
                        <span>Events Progress</span>
                    </div>
                    <div>
                        <div className="flex gap-6 justify-center">
                            <span className=" text-sm w-16">26th</span>
                            <span className=" text-sm w-16">GCC</span>
                        </div>
                        <div className="flex gap-6 justify-center">
                            <span className=" text-sm w-16">2nd</span>
                            <span className=" text-sm w-16">Co10</span>
                        </div>
                        <div className="flex gap-6 justify-center">
                            <span className=" text-sm w-16">7th</span>
                            <span className=" text-sm w-16">PyDay</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default MyProgress