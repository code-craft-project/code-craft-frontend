import { useContext, useState } from "react"
import MDEditor from '@uiw/react-md-editor';
import { CreateChallengeContext } from "../../../application/contexts/CreateChallengeContext";

function ChallengeDescription() {

    const [btnToggle, setBtnToggle] = useState<boolean>(true)
    const { setDescription, description } = useContext(CreateChallengeContext)

    return (
        <div className="flex flex-col gap-10 items-center w-full">
            <div className="flex flex-col gap-3 w-full">
                <h1 className="text-xl font-meduim text-start">Description</h1>
                <div className="w-full">
                    <div className="flex w-full">
                        <button onClick={() => { setBtnToggle(true) }} className={`${btnToggle ? 'bg-white' : 'bg-gray-300 '}   text-black w-1/2 py-1 rounded-lg font-semibold hover:bg-opacity-80 transition-all duration-200`}>Edit</button>
                        <button onClick={() => { setBtnToggle(false) }} className={`${btnToggle ? 'bg-gray-300 ' : 'bg-white'} bg-gray-300 text-black w-1/2 py-1 rounded-lg font-semibold hover:bg-opacity-80 transition-all duration-200`}>Preview</button>
                    </div>
                    <div className="container flex flex-col gap-5">
                        <MDEditor
                            value={description}
                            onChange={(value) => setDescription(value || '')}
                            className={`${btnToggle ? '' : 'hidden'} `}
                            aria-required
                        />
                        <MDEditor.Markdown source={description} className={`${btnToggle ? 'hidden' : ''}  whitespace-pre-wrap p-5 rounded-xl`} />
                    </div>
                    {/* <div className={`${btnToggle ? 'hidden' : ''} w-full p-5 bg-white bg-opacity-45 rounded-xl`}>{description}</div> */}
                </div>
            </div>
        </div>
    )
}

export default ChallengeDescription