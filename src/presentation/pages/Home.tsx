import { NavLink } from "react-router-dom"
import OneChallengeCard from "../components/OneChallengeCard"
import { Icon } from '@iconify/react';
import GradientColor from "../../application/data/GradientColor";
import profile from '../../assets/Images/profile.png';

function Home() {
    const {styles} = GradientColor()

    const scroller =() => {
        const scrollContainer:any = document.querySelector('.scroll-container');
        const startScroll = () => {
            scrollContainer.scrollLeft += 5; 
        };
        startScroll();
    }
return (
    <div className="mt-20 p-16 mx-12 ">
        <div  >
            <h3 className="opacity-60 ">Welcome to</h3>
            <h2 className="font-semibold">Challenger  Mentality Home</h2>
        </div>
        <div className="flex py-14 justify-between w-[99%]">
            <div className="bg-primary-blue bg-opacity-60 py-3 px-5 w-[17rem] h-36 flex flex-col items-start justify-around  shadow-[0_0_10px_5px_rgba(32,32,156,0.5)] rounded-lg">
                <h1 className="text-xl font-semibold">Public Challenges:</h1>
                <p className="text-xs opacity-75">There are more than 300 challenges</p>
                <NavLink to="/" className="bg-primary-yellow bg-opacity-80 font-semibold py-0.5 px-3 text-sm rounded-sm flex items-center active:scale-105 hover:opacity-90 transition-all">Get Started</NavLink>
            </div>
            <div className="bg-primary-blue bg-opacity-60 py-3 px-5 w-[17rem] h-36 flex flex-col items-start justify-around  shadow-[0_0_10px_5px_rgba(32,32,156,0.5)] rounded-lg">
                <h1 className="text-xl font-semibold">Events:</h1>
                <p className="text-xs opacity-75">There are two event types public and private event</p>
                <NavLink to="/" className="bg-primary-yellow bg-opacity-80 font-semibold py-0.5 px-3 text-sm rounded-sm flex items-center active:scale-105 hover:opacity-90 transition-all">Explore Events</NavLink>
            </div>
            <div className="bg-primary-blue bg-opacity-60 py-3 px-5 w-[17rem] h-36 flex flex-col items-start justify-around  shadow-[0_0_10px_5px_rgba(32,32,156,0.5)] rounded-lg">
                <h1 className="text-xl font-semibold">Job Posts:</h1>
                <p className="text-xs opacity-75">Our companies give you job opportunities to hire you</p>
                <NavLink to="/" className="bg-primary-yellow bg-opacity-80 font-semibold py-0.5 px-3 text-sm rounded-sm flex items-center active:scale-105 hover:opacity-90 transition-all">Learn more</NavLink>
            </div>
        </div>
        <h1 className="opacity-60 pt-16 mb-2">Top Challenges</h1>
        <div className="flex flex-wrap gap-16 pb-16  w-[100%]">
            <div className="w-[66%]">
                <div className="scroll-container w-[100%] scrollbar-none ">
                    <div className="flex py-2 gap-10 relative  scroll-content items-center">
                        <div className={`cursor-pointer hover:opacity-75 transition-opacity duration-300  flex justify-center items-center gap-1  px-3 py-1 rounded-lg ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>
                            <Icon icon="ph:code" width="18" height="18" />
                            <span className="min-w-28 text-center">All Topics</span>
                        </div>
                        <div className="cursor-pointer active:scale-105 hover:opacity-75 transition-all duration-300 flex justify-center items-center gap-1 bg-white bg-opacity-30 px-3 py-1 rounded-lg">
                            <Icon icon="mdi:flowchart" width="18" height="18" />
                            <span className="min-w-28 text-center">Algorithms</span>
                        </div>
                        <div className="cursor-pointer active:scale-105 hover:opacity-75 transition-all duration-300 flex justify-center items-center gap-1 bg-white bg-opacity-30 px-3 py-1 rounded-lg">
                            <Icon icon="carbon:data-structured" width="18" height="18" />
                            <span className="inline-block min-w-[7rem]">Data Structure</span>
                        </div>
                        <div className="cursor-pointer active:scale-105 hover:opacity-75 transition-all duration-300 flex justify-center items-center gap-1 bg-white bg-opacity-30 px-3 py-1 rounded-lg">
                            <Icon icon="carbon:data-structured" width="18" height="18" />
                            <span className="inline-block min-w-[7rem]">Data Structure</span>
                        </div>
                        <div className="cursor-pointer active:scale-105 hover:opacity-75 transition-all duration-300 flex justify-center items-center gap-1 bg-white bg-opacity-30 px-3 py-1 rounded-lg">
                            <Icon icon="material-symbols-light:database" width="18" height="18" />
                            <span className="inline-block min-w-[7rem]">Data Base</span>
                        </div>
                        <div className="cursor-pointer active:scale-105 hover:opacity-75 transition-all duration-300 flex justify-around items-center gap-1 bg-white bg-opacity-30 px-3 py-1 rounded-lg mr-2">
                            <Icon icon="tabler:brand-powershell" width="18" height="18" />
                            <span className="inline-block min-w-[7rem]">Shell</span>
                        </div>
                        <div className="cursor-pointer active:scale-105 hover:opacity-75 transition-all duration-300 flex justify-center items-center gap-1 bg-white bg-opacity-30 px-3 py-1 rounded-lg mr-2">
                            <Icon icon="tabler:brand-powershell" width="18" height="18" />
                            <span className="inline-block min-w-[7rem]">Shell</span>
                        </div>
                        <div onClick={scroller} className="cursor-pointer shadow-[0_0_10px_15px_rgba(0,0,0,0.5)] rounded-full sticky top-4 right-0 ">
                            <Icon icon="material-symbols:double-arrow" width="18" height="18" />  
                        </div>
                    </div>
                </div>    
                <div className="text-sm">
                    <div >
                        <div className="flex items-center py-2 w-[80%] gap-16">
                            <div className="w-[14rem]">
                                <span className=" px-2">Status</span>
                            </div>
                            <div className=" w-80 text-center">
                                <span>Title</span>
                            </div>
                            <span className="w-[10rem] text-end">Difficulty</span>
                            <span className="text-nowrap">Maximum Score</span>
                        </div>
                        <hr className="w-[80%]"/>
                        {Array.from({length: 8}).map((_,index)=>(
                        <div key={index}>
                            <OneChallengeCard challenge={{status: 'Done', title: 'Bracket Combinations', difficulty:'Hard', maximumScore: 13}}/>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-16">
                <div className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} flex gap-10 items-center p-10 rounded-lg font-semibold h-36 shadow-md shadow-primary-yellow`}>
                    <div className="flex flex-col ">
                        <img src={profile} className='rounded-full h-10 w-10 border-3' alt="" />
                        <span className="opacity-50">Total</span>
                        <span>2/85</span>
                    </div>
                    <div>
                        <div className="flex gap-5">
                            <span className="w-16">Easy</span>
                            <span>0/20</span>
                        </div>
                        <div className="flex gap-5">
                            <span className="w-16">Meduim</span>
                            <span>1/20</span>
                        </div>
                        <div className="flex gap-5">
                            <span className="w-16">Hard</span>
                            <span>1/46</span>
                        </div>
                    </div>
                </div>
                <div className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} flex flex-col gap-5 items-start px-10 py-5 rounded-lg font-semibold h-56 w-72 shadow-md shadow-primary-yellow`}>
                    <div>
                        <span>Filters</span>
                    </div>
                    <h1>DIFFiCULTY</h1>
                    <div>
                        <div className="flex gap-6 justify-center">
                            <input type="checkbox" /> 
                            <span className="w-16">Easy(75)</span>
                        </div>
                        <div className="flex gap-6 justify-center">
                            <input type="checkbox" /> 
                            <span className="w-16">Meduim(74)</span>
                        </div>
                        <div className="flex gap-6 justify-center">
                            <input type="checkbox" /> 
                            <span className="w-16">Hard(23)</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    )
}

export default Home