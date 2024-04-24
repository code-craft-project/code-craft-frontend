import { useEffect, useState } from "react"

function ChallengeDescription() {
    const [btnToggle, setBtnToggle] = useState<boolean>(true)
    const [description, setDescription] = useState<string>('')
    useEffect(() => {
        console.log('Updated description:', description);
      }, [description]); // Re-run only when description changes
    
  return (
    <div className="flex flex-col gap-10 items-center w-full">
        <div className="flex flex-col gap-3 w-full">
            <h1 className="text-xl font-meduim text-start">Description</h1>
            <div className="w-full">
                <div className="flex w-full">
                    <button onClick={()=>{setBtnToggle(true)}} className="bg-white text-black w-1/2 py-1 rounded-lg font-semibold">Edit</button>
                    <button onClick={()=>{setBtnToggle(false)}} className="bg-gray-300 text-black w-1/2 py-1 rounded-lg font-semibold">Preview</button>
                </div>
                <textarea 
                    value={description}  
                    onChange={ ev => {setDescription(ev.target.value)}} 
                    cols={85} 
                    rows={5}
                    className={`w-full p-3 text-black placeholder:font-meduim font-meduim rounded-lg ${btnToggle ? '' : 'hidden'}`} placeholder="Description.."/>
                <div className={`${btnToggle ? 'hidden' : ''} w-full p-5 bg-white bg-opacity-45 rounded-xl`}>{description}</div>
            </div>
        </div>
    </div>
  )
}

export default ChallengeDescription