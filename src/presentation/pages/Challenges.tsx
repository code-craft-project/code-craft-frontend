import OneChallengeCard from "../components/OneChallengeCard"
import { Icon } from '@iconify/react';
import GradientColor from "../../application/data/GradientColor.ts";
import profile from '../../assets/Images/profile.png';

function Challenges() {
    const {styles} = GradientColor()

    const scroller =() => {
        const scrollContainer:any = document.querySelector('.scroll-container');
        const startScroll = () => {
            scrollContainer.scrollLeft += 5; 
        };
        startScroll();
    }
  return (
    <div className='p-10 mt-20 mx-[4.5rem]'>
        <h1 className="opacity-60 pt-8 mb-2">All Challenges</h1>
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
                            <OneChallengeCard challenge={{status: 'Done', title: 'Bracket Combinations dsfdsf dsfsd', difficulty:'Hard', maximumScore: 13}}/>
                        </div>
                        ))}
                        {Array.from({length: 8}).map((_,index)=>(
                            <div key={index}>
                                <OneChallengeCard challenge={{status: 'Not Started', title: 'Bracket Combinations', difficulty:'Easy', maximumScore: 8}}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-16 mt-16">
                <div className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} flex flex-col gap-5 items-start px-10 py-5 rounded-lg font-semibold h-[30rem] w-72 shadow-md shadow-primary-yellow`}>
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
                    <h1>STATUS</h1>
                    <div>
                        <div className="flex gap-6 justify-center">
                            <input type="checkbox" /> 
                            <span className="w-16">Done(75)</span>
                        </div>
                        <div className="flex gap-6 justify-center text-nowrap">
                            <input type="checkbox" /> 
                            <span className="w-16">Not Started(74)</span>
                        </div>
                    </div>
                    <h1>SCORE</h1>
                    <div>
                        <div className="flex gap-6 justify-center">
                            <input type="checkbox" /> 
                            <span className="w-16">ASCENDENT(75)</span>
                        </div>
                        <div className="flex gap-6 justify-center">
                            <input type="checkbox" /> 
                            <span className="w-16">DESCENDENT(74)</span>
                        </div>
                        <div className="flex gap-6 justify-center">
                            <input type="checkbox" /> 
                            <span className="w-16">Hard(23)</span>
                        </div>
                    </div>
                </div>
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
                <div className={` ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} flex flex-col gap-5 items-start px-8 py-5 rounded-lg font-semibold h-auto w-72 shadow-md shadow-primary-yellow`}>
                    <h1>Global Ranking</h1>
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-6 justify-center items-center">
                            <span>1</span>
                            <div className="w-10 h-10 relative">
                                <img src={profile} className='rounded-full h-10 w-10 ' alt="" />
                                <Icon icon="noto-v1:1st-place-medal" width="18" height="18" className="absolute right-3 bottom-[70%]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-md">Kadik Salah</span>
                                <div className="flex gap-5">
                                    <div className="flex text-xs">
                                        <span className="opacity-80 font-medium">Ranking:</span>
                                        <span>3000</span>
                                    </div>
                                    <div className="flex text-xs">
                                        <span className="opacity-80 font-medium">Solve:</span>
                                        <span>80</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="flex gap-6 justify-center items-center">
                            <span>1</span>
                            <div className="w-10 h-10 relative">
                                <img src={profile} className='rounded-full h-10 w-10 ' alt="" />
                                <Icon icon="noto-v1:1st-place-medal" width="18" height="18" className="absolute right-3 bottom-[70%]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-md">Kadik Salah</span>
                                <div className="flex gap-5">
                                    <div className="flex text-xs">
                                        <span className="opacity-80 font-medium">Ranking:</span>
                                        <span>3000</span>
                                    </div>
                                    <div className="flex text-xs">
                                        <span className="opacity-80 font-medium">Solve:</span>
                                        <span>80</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="flex gap-6 justify-center items-center">
                            <span>1</span>
                            <div className="w-10 h-10 relative">
                                <img src={profile} className='rounded-full h-10 w-10 ' alt="" />
                                <Icon icon="noto-v1:3rd-place-medal" width="18" height="18" className="absolute right-3 bottom-[70%]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-md">Kadik Salah</span>
                                <div className="flex gap-5">
                                    <div className="flex text-xs">
                                        <span className="opacity-80 font-medium">Ranking:</span>
                                        <span>3000</span>
                                    </div>
                                    <div className="flex text-xs">
                                        <span className="opacity-80 font-medium">Solve:</span>
                                        <span>80</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-6 justify-center items-center">
                            <span>1</span>
                            <div className="w-10 h-10 ">
                                <img src={profile} className='rounded-full h-10 w-10 ' alt="" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-md">Kadik Salah</span>
                                <div className="flex gap-5">
                                    <div className="flex text-xs">
                                        <span className="opacity-80 font-medium">Ranking:</span>
                                        <span>3000</span>
                                    </div>
                                    <div className="flex text-xs">
                                        <span className="opacity-80 font-medium">Solve:</span>
                                        <span>80</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="#" className="underline hover:opacity-80 mx-auto">View More</a>
                </div>
                
                

            </div>
        </div>
    </div>
  )
}

export default Challenges