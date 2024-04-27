import { Icon } from "@iconify/react/dist/iconify.js";
import ChallengeBox from "../components/challenge_page/ChallengeBox";
import CodeEditor from "../components/challenge_page/CodeEditor";
import ExecutionResult from "../components/challenge_page/ExecutionResult";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useChallenge from "../../application/hooks/useChallenge";
import LoadingIndicator from "../components/LoadingIndicator";
import SubmissionContext from "../../application/contexts/SubmissionContext";
import useSubmission from "../../application/hooks/useSubmission";

export default function ChallengePage() {
    const { id } = useParams();
    const { isLoading, challenge, getChallengeById } = useChallenge();
    const useSubmissionValue = useSubmission();


    useEffect(() => {
        if (id) {
            getChallengeById(parseInt(id));
        }
    }, [id]);

    return (
        <SubmissionContext.Provider value={useSubmissionValue}>
            <div className="w-full h-screen flex flex-col items-center overflow-auto bg-gray-950">
                <div className="w-full flex items-center justify-between py-2 px-4">
                    <div className="w-1/3 flex items-center justify-start">
                        <div className="h-10 w-10 bg-gray-800 rounded-full mr-2"></div>
                        <Icon icon="icon-park-solid:paragraph-triangle" />
                        <div className="ml-2 text-sm font-semibold">{challenge.title} - {challenge.topic}</div>
                    </div>

                    <div className="w-1/3 flex items-center justify-center">
                        <div onClick={() => id ? useSubmissionValue.run(parseInt(id)) : null} className="flex items-center text-gray-50 bg-gray-900 rounded-l-lg py-2 px-4 cursor-pointer hover:text-gray-300 focus:ring-4 shadow-lg transform active:scale-90 transition-transform">
                            <Icon icon="gravity-ui:play-fill" />
                            <div className="text-sm font-semibold ml-2">Run</div>
                        </div>
                        <div onClick={() => id ? useSubmissionValue.submit(parseInt(id)) : null} className="flex items-center text-green-500 bg-gray-900 rounded-r-lg py-2 px-4 ml-px cursor-pointer hover:text-green-600 focus:ring-4 shadow-lg transform active:scale-90 transition-transform">
                            <Icon icon="mingcute:upload-3-line" />
                            <div className="text-sm font-semibold ml-2">Submit</div>
                        </div>
                    </div>

                    <div className="w-1/3 flex items-center justify-end">
                        <div className="h-8 w-8 bg-gray-900 rounded-full"></div>
                        <div className="text-gray-50 text-sm font-semibold ml-2">@username</div>
                    </div>
                </div>

                {
                    isLoading ? (
                        <div className="w-full flex items-center justify-center flex-grow">
                            <LoadingIndicator />
                        </div>
                    ) : (
                        <div className="w-full flex items-center justify-between flex-grow p-4 overflow-auto">
                            <div className="w-1/2 h-full px-1 overflow-auto">
                                <ChallengeBox challenge={challenge} />
                            </div>

                            <div className="w-1/2 h-full px-1">
                                <div className="w-full h-full">
                                    <div className="w-full h-1/2 pb-1">
                                        <CodeEditor />
                                    </div>
                                    <div className="w-full h-1/2 pt-1">
                                        <ExecutionResult challengeId={id ? parseInt(id) : 0} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </SubmissionContext.Provider>
    );
}