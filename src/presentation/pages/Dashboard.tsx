import { Icon } from "@iconify/react/dist/iconify.js"
import GradientColor from "../../application/data/GradientColor.ts";
import { useState } from "react";
import Members from "../components/dashboard/Members.tsx";
import Events from "../components/dashboard/Events.tsx";

function Dashboard() {
    const {styles} = GradientColor()
    const [changeComponent,setChangeComponent] =useState<number>(0)

    const components = [
        {
            title: 'Controll your organization members',
            content: <Members/>
        },
        {
            title: 'Controll your events',
            content: <Events/>
        },
    ] 
    const handleDashboardChange = (event:any) => {
        if(event.target.value == 'members'){
            setChangeComponent(0)
        }else {
            setChangeComponent(1)
        }
    };
  return (
    <div className="mt-10">
        <div className="flex justify-around items-center gap-10 mt-24">
            <div className="flex gap-10 items-center">
                <h1 className="text-xl font-bold flex gap-3 items-center">Dashboard</h1>
                <select 
                    className="bg-white bg-opacity-20 font-semibold text-lg rounded-lg px-3 py-1 outline-none"
                    onChange={handleDashboardChange}
                >
                    <option value="members">Members</option>
                    <option value="events">Events</option>
                </select>
            </div>
            <div className="flex items-center gap-5">
                <div className="flex relative rounded-r-lg ">
                    <input type="text" placeholder={` ${changeComponent == 0 ? 'Search member..' : 'Search event..'}`} className=" bg-white outline-none bg-opacity-20 rounded-lg px-10 w-[22rem] py-1.5"/>
                    <Icon icon="iconoir:search" className=" h-10 w-10 px-2 cursor-pointer absolute left-0 text-white rounded-r-lg opacity-40"/>
                </div>
                <button className={`bg-white bg-opacity-30 font-semibold flex items-center gap-3 ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} px-2 py-1 hover:bg-opacity-35 transition-all duration-200 active:scale-105 rounded-md`}>
                    <Icon icon="material-symbols:add" width="18" height="18" />
                    <span> {changeComponent == 0 ? 'Add Member' : 'Add Event'}</span>
                </button>
            </div>
        </div>
        {components[changeComponent].content}

    </div>
  )
}

export default Dashboard