import { useContext, useState } from "react"
import MDEditor from '@uiw/react-md-editor';
import { CreateChallengeContext } from "../../../application/contexts/CreateChallengeContext";

function ChallengeDescription() {
    const [btnToggle, setBtnToggle] = useState<boolean>(true)
    const { challenge, setChallenge } = useContext(CreateChallengeContext)

    return (
        <div className="w-full flex flex-col gap-10 items-center">
            <div className="w-full flex flex-col gap-3">
                <h1 className="font-semibold text-gray-50 mb-2">Description:</h1>
                <div className="w-full">
                    <div className="w-full flex">
                        <button onClick={() => { setBtnToggle(true) }} className={`${btnToggle ? 'bg-gray-800' : 'bg-gray-900 '}   text-gray-50 w-1/2 py-1 rounded-tl-lg font-semibold hover:bg-gray-800 transition-all duration-200`}>Edit</button>
                        <button onClick={() => { setBtnToggle(false) }} className={`${btnToggle ? 'bg-gray-900 ' : 'bg-gray-800'} text-gray-50 w-1/2 py-1 rounded-tr-lg font-semibold hover:bg-opacity-80 transition-all duration-200`}>Preview</button>
                    </div>
                    <div className="w-full flex flex-col gap-5">
                        <MDEditor
                            value={challenge.description}
                            onChange={value => setChallenge(state => ({ ...state, description: value || '' }))}
                            className={`${btnToggle ? '' : 'hidden'}`}
                            data-color-mode={"dark"}
                            aria-required
                        />
                        <MDEditor.Markdown source={challenge.description} className={`${btnToggle ? 'hidden' : ''} flex-grow min-h-56 bg-gray-800 whitespace-pre-wrap p-5 rounded-b-xl`} />
                    </div>
                    {/* <div className={`${btnToggle ? 'hidden' : ''} w-full p-5 bg-white bg-opacity-45 rounded-xl`}>{description}</div> */}
                </div>
            </div>
        </div>
    )
}

export default ChallengeDescription