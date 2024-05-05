import { useContext, useState } from "react"
import BasicInformation from "../components/create_challenge/BasicInformation"
import ChallengeDescription from "../components/create_challenge/ChallengeDescription"
import TestCasesAndFiles from "../components/create_challenge/TestCasesAndFiles"
import GradientColor from "../../application/data/GradientColor"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useParams } from "react-router-dom"
import { CreateChallengeContext } from "../../application/contexts/CreateChallengeContext"
import LoadingIndicator from "../components/LoadingIndicator";
import useOrganizationChallenge from "../../application/hooks/useOrganizationChallenge"

function CreateChallenge() {
    const [changeComponent,setChangeComponent] =useState<number>(0)

    const components = [
        {
            title: 'Basic information',
            content: <BasicInformation/>
        },
        {
            title: 'Explaining the challenge',
            content: <ChallengeDescription/>
        },
        {
            title: 'challenge tests cases and files',
            content: <TestCasesAndFiles/>,
        },
        ] 
    const {id} = useParams()
    const {createOrganizationChallenge,isLoading} = useOrganizationChallenge()
   
    const {  description, title, topic, level, is_public, type, testCases,} = useContext(CreateChallengeContext)
    const {styles} = GradientColor()
    const handleCreateChallenge = () => {
        if(id){
            createOrganizationChallenge(parseInt(id))     
            console.log(description,title,topic,level,is_public,type,testCases)
        }
        console.log(description,title,topic,level,is_public,type,testCases)
        // createOrganizationChallenge(parseInt(id))
    }
    return (
        <div className="my-16 flex flex-col gap-32 items-center">
            <div className="flex flex-col gap-10 items-center w-full">
                <h1 className="text-center font-semibold text-2xl">Create Organization</h1>
                <div className="flex items-center justify-around w-[90%] mx-auto">
                    <div className="flex gap-3 items-center transition-all duration-300">
                        {changeComponent <= 0 
                            ? <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white opacity-80 border-6 border-primary-blue"><span className="bg-primary-blue bg-opacity-15 w-full h-full flex justify-center items-center text-xl text-black">1</span></div>
                            : <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white opacity-80 border-6 border-primary-blue"><Icon className="text-black" icon="material-symbols:check" width="18" height="18" /></div>
                        }
                        <div className="flex flex-col ">
                            <span className="font-semibold text-lg">Info</span>
                            <span className="opacity-75 text-xs">Basic information</span>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center transition-all duration-300">
                    {changeComponent <= 1   
                            ? <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white opacity-80 border-6 border-primary-blue"><span className="bg-primary-blue bg-opacity-15 w-full h-full flex justify-center items-center text-xl text-black">2</span></div>
                            : <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white opacity-80 border-6 border-primary-blue"><Icon className="text-black" icon="material-symbols:check" width="18" height="18" /></div>
                    } 
                    <div className="flex flex-col ">
                        <span className="font-semibold text-lg">Challenge Description</span>
                        <span className="opacity-75 text-xs">Explaining the challenge</span>
                    </div>
                    </div>
                    <div className="flex gap-3 items-center transition-all duration-300">
                            {changeComponent <= 2 
                            ? <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white opacity-80 border-6 border-primary-blue"><span className="bg-primary-blue bg-opacity-15 w-full h-full flex justify-center items-center text-xl text-black">3</span></div>
                            : <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white opacity-80 border-6 border-primary-blue"><Icon className="text-black" icon="material-symbols:check" width="18" height="18" /></div>
                            }
                        <div className="flex flex-col ">
                            <span className="font-semibold text-lg">Test Cases & Files</span>
                            <span className="opacity-75 text-xs">challenge tests cases and files</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-16 w-1/2 items-center">
                {components[changeComponent].content}
                {changeComponent !== 2
                    ? <button onClick={() => { setChangeComponent(changeComponent+1)}} className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}  font-meduim px-3 font-semibold py-1 rounded-lg w-full hover:opacity-90 active:scale-105 transition-all duration-300`}>Next</button>
                    : <button onClick={() => {if (!isLoading) handleCreateChallenge()}}  className={`${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}  font-meduim px-3 py-1 rounded-lg font-semibold w-full hover:opacity-90 active:scale-105 transition-all duration-300`}>
                            {isLoading && (<LoadingIndicator />)}
                            {!isLoading && "Create"}
                        </button>
                }
            </div>
        </div>
    )
    }

export default CreateChallenge