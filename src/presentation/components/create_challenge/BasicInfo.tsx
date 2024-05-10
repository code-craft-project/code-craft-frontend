import { useContext } from "react"
import { CreateChallengeContext } from "../../../application/contexts/CreateChallengeContext"
import { challengeLevels, challengesTopics } from "../../../application/consts"

export default function BasicInfo() {
    const { challenge, setChallenge } = useContext(CreateChallengeContext);

    return (
        <div className="flex flex-col w-full items-center">
            <div className="w-full flex flex-col mb-4">
                <h1 className="font-semibold text-gray-50 mb-2">Title:</h1>
                <input
                    type="text"
                    className="bg-gray-800 text-gray-50 placeholder:font-medium font-medium px-4 py-2 rounded-lg outline-none focus:bg-gray-700 duration-300"
                    placeholder="Type your title"
                    value={challenge.title}
                    onChange={ev => setChallenge(state => ({ ...state, title: ev.target.value }))}
                />
            </div>
            <div className="w-full flex flex-col mb-4">
                <h1 className="font-semibold text-gray-50 mb-2">Topic:</h1>
                <select
                    value={challenge.topic}
                    onChange={ev => setChallenge(state => ({ ...state, topic: ev.target.value as ChallengeTopic }))}
                    className="bg-gray-800 text-gray-50 placeholder:font-medium font-medium px-4 py-2 rounded-lg outline-none focus:bg-gray-700 duration-300 capitalize"
                >
                    <option className="capitalize" value="" disabled selected>Select Topics</option>
                    {
                        challengesTopics.filter(t => t != 'all topics').map(topic => {
                            return (
                                <option className="capitalize" value={topic}>{topic}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="w-full flex flex-col mb-4">
                <div className="flex justify-between items-end">
                    <div className="w-1/2 flex flex-col pr-2">
                        <h1 className="font-semibold text-gray-50 mb-2">Level:</h1>
                        <select
                            value={challenge.level}
                            onChange={ev => setChallenge(state => ({ ...state, level: ev.target.value as ChallengeLevel }))}
                            className="bg-gray-800 text-gray-50 placeholder:font-medium font-medium px-4 py-2 rounded-lg outline-none focus:bg-gray-700 duration-300 capitalize"
                        >
                            <option className="capitalize" value="" disabled selected>Select Level</option>
                            {
                                challengeLevels.map((_level, index) => {
                                    return (
                                        <option key={index} className="capitalize" value={_level}>{_level}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="w-1/2 flex flex-col pl-2">
                        <h1 className="font-semibold text-gray-50 mb-2">Privacy:</h1>
                        <select
                            value={challenge.is_public ? "public" : "private"}
                            onChange={ev => setChallenge(state => ({ ...state, is_public: ev.target.value == 'public' }))}
                            className="bg-gray-800 text-gray-50 placeholder:font-medium font-medium px-4 py-2 rounded-lg outline-none focus:bg-gray-700 duration-300 capitalize">
                            <option className="capitalize " value="" disabled selected>Select Privacy</option>
                            <option className="capitalize " value="public">Public</option>
                            <option className="capitalize " value="private">Private</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}