import { useContext } from "react"
import { CreateChallengeContext } from "../../../application/contexts/CreateChallengeContext"
import { challengesTopics } from "../../../application/consts"

function BasicInformation() {

    const {title, setTitle, setTopic, setLevel, setIsPublic} = useContext(CreateChallengeContext)
    const handleChallengePrivacy =  (ev: any) => {
        if(ev.target.value == "public") {
            setIsPublic(true)
        }else{
            setIsPublic(false)
        }
    }
    return (
        <div className="flex flex-col gap-5 w-full items-center">
            <div className="flex flex-col gap-3 w-full">
                <h1 className="text-xl font-semibold text-start ">Title</h1>
                <input 
                    type="text" 
                    className="bg-white text-black placeholder:font-meduim font-meduim px-3 py-1 rounded-lg " 
                    placeholder="Enter Event Name"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)} 
                    required
                />
            </div>
            <div className="flex flex-col gap-3 w-full">
                <h1 className="text-xl font-semibold text-start ">Topic</h1>
                <select required onChange={ ev => setTopic(ev.target.value as ChallengeTopic)} className=" bg-white font-meduim py-1 px-3 rounded-lg text-black">
                    <option className="capitalize " value="" disabled selected>Select Topics</option>
                    {challengesTopics.map(topic => (
                        <option className="capitalize " value={topic}>{topic}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <div className="flex justify-between items-end">
                    <div className="w-[49%] flex flex-col gap-2 ">
                        <h1 className="text-xl font-semibold text-start">Level</h1>
                        <select onChange={ ev => setLevel(ev.target.value as ChallengeLevel)} className=" bg-white font-meduim py-1 px-3 rounded-lg text-black" required >
                            <option className="capitalize " value="" disabled selected>Select Level</option>
                            <option className="capitalize " value="easy">easy</option>
                            <option className="capitalize " value="hard">hard</option>
                            <option className="capitalize " value="meduim">meduim</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-3 w-[49%]">
                        <h1 className="text-xl font-semibold text-start">Privacy</h1>
                        <select onChange={handleChallengePrivacy} className=" bg-white font-meduim py-1 px-3 rounded-lg text-black">
                            <option className="capitalize " value="" disabled selected>Select Privacy</option>
                            <option className="capitalize " value="">Public</option>
                            <option className="capitalize " value="">Private</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>)
}

export default BasicInformation