import { Icon } from "@iconify/react/dist/iconify.js";
import ChallengeBox from "../components/challenge_page/ChallengeBox";
import CodeEditor from "../components/challenge_page/CodeEditor";
import ExecutionResult from "../components/challenge_page/ExecutionResult";
import { useContext, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import useChallenge from "../../application/hooks/useChallenge";
import LoadingIndicator from "../components/LoadingIndicator";
import SubmissionContext from "../../application/contexts/SubmissionContext";
import useSubmission from "../../application/hooks/useSubmission";
import ChallengeContext from "../../application/contexts/ChallengeContext";
import { logoSVG, userProfilePicture } from "../../application/consts";
import UserSessionContext from "../../application/contexts/UserSessionContext";
import ToastContext from "../../application/contexts/ToastContext";

export default function ChallengePage() {
    const { id } = useParams();
    const { isLoading, challenge, getChallengeById } = useChallenge();
    const useSubmissionValue = useSubmission();
    const useChallengeValue = useChallenge();
    const { isValidSession, userSession } = useContext(UserSessionContext);
    const { alertError } = useContext(ToastContext);


    useEffect(() => {
        if (id) {
            getChallengeById(parseInt(id));
        }
    }, [id]);

    const submitCode = () => {
        if (!isValidSession) {
            alertError("You need to Sign In first");
            return;
        }

        if (!id) {
            return;
        }

        useSubmissionValue.submit(parseInt(id));
    }

    return (
        <SubmissionContext.Provider value={useSubmissionValue}>
            <ChallengeContext.Provider value={useChallengeValue}>
                <div className="w-full h-screen flex flex-col items-center overflow-auto bg-gray-950">
                    <div className="w-full flex items-center justify-between py-2 px-4">
                        <div className="w-1/3 flex items-center justify-start">
                            <NavLink to={'/'} className="h-10 w-10 bg-transparent rounded-full mr-2">
                                <img src={logoSVG} className="w-10" />
                            </NavLink>
                            <Icon icon="icon-park-solid:paragraph-triangle" />
                            <div className="ml-2 text-sm font-semibold">{challenge.title} - {challenge.topic}</div>
                        </div>

                        <div className="w-1/3 flex items-center justify-center">
                            <div onClick={() => id ? useSubmissionValue.run(parseInt(id)) : null} className="flex items-center text-gray-50 bg-gray-900 rounded-l-lg py-2 px-4 cursor-pointer hover:text-gray-300 focus:ring-4 shadow-lg transform active:scale-90 transition-transform">
                                <Icon icon="gravity-ui:play-fill" />
                                <div className="text-sm font-semibold ml-2">Run</div>
                            </div>
                            <div onClick={submitCode} className="flex items-center text-green-500 bg-gray-900 rounded-r-lg py-2 px-4 ml-px cursor-pointer hover:text-green-600 focus:ring-4 shadow-lg transform active:scale-90 transition-transform">
                                <Icon icon="mingcute:upload-3-line" />
                                <div className="text-sm font-semibold ml-2">Submit</div>
                            </div>
                        </div>

                        <div className="w-1/3 flex items-center justify-end">
                            {
                                isValidSession ? (
                                    <NavLink to={'/home'} className="h-8 w-8 bg-gray-900 rounded-full cursor-pointer" title={userSession.user?.username}>
                                        <img src={userSession.user?.profile_image_url || userProfilePicture} className="h-full w-full object-cover rounded-full" />
                                    </NavLink>
                                ) : (
                                    <NavLink to={"/sign-in"} className="flex items-center px-4 py-2 rounded-lg text-gray-50 hover:text-yellow-600 cursor-pointer duration-300">
                                        <Icon icon="uil:signin" />
                                        <div className="font-semibold text-sm ml-2">Sign In</div>
                                    </NavLink>
                                )
                            }
                            {/* <div className="text-gray-50 text-sm font-semibold ml-2">{userSession.user?.username}</div> */}
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
                                    <ChallengeBox />
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
            </ChallengeContext.Provider>
        </SubmissionContext.Provider>
    );
}