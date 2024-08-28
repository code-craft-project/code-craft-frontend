import { useContext, useEffect, useState } from "react";
import BasicInfo from "./create_challenge/BasicInfo";
import ChallengeDescription from "./create_challenge/ChallengeDescription";
import TestCasesAndFiles from "./create_challenge/TestCasesAndFiles";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "react-router-dom";
import { AnimatePresence, AnimationControls, motion } from 'framer-motion';
import useSlideInOut from "../../application/hooks/useSlideInOut";
import useCreateChallenge from "../../application/hooks/useCreateChallenge";
import { CreateChallengeContext } from "../../application/contexts/CreateChallengeContext";
import ToastContext from "../../application/contexts/ToastContext";
import OrganizationDashboardContext from "../../application/contexts/OrganizationDashboardContext";
import { DashboardModelContext } from "../../application/contexts/DashboardModelContext";

interface CreateOrganizationChallengeProps {
    useEditChallenge: [ChallengeEntity | undefined, React.Dispatch<React.SetStateAction<ChallengeEntity | undefined>>];
};

export default function CreateOrganizationChallenge({ useEditChallenge }: CreateOrganizationChallengeProps) {
    const [editChallenge, setEditChallenge] = useEditChallenge;

    const { id } = useParams();
    const { updateOrganizationChallenge, updateEventChallenge, updateEventChallengeTestCases, updateOrganizationChallengeTestCases, appendNewChallenge } = useContext(OrganizationDashboardContext);
    const { close } = useContext(DashboardModelContext);

    const useCreateChallengeValue = useCreateChallenge();
    const [currentStep, setCurrentStep] = useState(0);

    const useSlideInOutValue0 = useSlideInOut();
    const useSlideInOutValue1 = useSlideInOut();
    const useSlideInOutValue2 = useSlideInOut();

    const toastManager = useContext(ToastContext);

    const getEventId = (): number | null => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const eventId = urlParams.get('event_id');
        if (eventId) {
            return parseInt(eventId);
        }

        return null;
    }

    useEffect(() => {
        if (editChallenge) {
            useCreateChallengeValue.setChallenge(editChallenge);
            useCreateChallengeValue.getTestCases(editChallenge.id!);
        }

        useSlideInOutValue0.open();
    }, []);

    const isValidStep1 = (): boolean => {
        if (useCreateChallengeValue.challenge.title.length == 0) {
            toastManager.alertError('Title must not be empty');
            return false;
        }

        if (useCreateChallengeValue.challenge.topic == undefined) {
            toastManager.alertError('You must select a topic');
            return false;
        }

        if (useCreateChallengeValue.challenge.level == undefined) {
            toastManager.alertError('You must select a level');
            return false;
        }

        if (useCreateChallengeValue.challenge.is_public == undefined) {
            toastManager.alertError('You must select a privacy');
            return false;
        }

        return true;
    }

    const isValidStep2 = (): boolean => {
        if (useCreateChallengeValue.challenge.description.length == 0) {
            toastManager.alertError('Description must not be empty');
            return false;
        }

        return true;
    }

    const isValidStep3 = (): boolean => {
        if (!useCreateChallengeValue.testCaseFile) {
            if (useCreateChallengeValue.testCases.length == 0) {
                toastManager.alertError('At least include one test case');
                return false;
            }

            for (let i = 0; i < useCreateChallengeValue.testCases.length; i++) {
                const testCase = useCreateChallengeValue.testCases[i];
                if (!testCase.inputs) {
                    toastManager.alertError(`Test case ${i + 1} must have at least one input.`);
                    return false;
                }

                for (let j = 0; j < testCase.inputs.length; j++) {
                    const input = testCase.inputs[j];
                    if (input.input.length == 0) {
                        toastManager.alertError(`Test case ${i + 1} at Input ${j + 1} must not be empty.`);
                        return false;
                    }
                }
                if (testCase.output.length == 0) {
                    toastManager.alertError(`Output at test case ${i + 1} must not be empty.`);
                    return false;
                }
            }
        }

        return true;
    }

    const goToStep2 = () => {
        if (!isValidStep1()) {
            return;
        }
        setCurrentStep(1);
        useSlideInOutValue0.close();
        useSlideInOutValue1.open();
    }

    const goToStep3 = () => {
        if (!isValidStep2()) {
            return;
        }
        setCurrentStep(2);
        useSlideInOutValue1.close();
        useSlideInOutValue2.open();
    }

    const createChallengeHandler = async () => {
        if (!isValidStep3()) {
            return;
        }

        setCurrentStep(3);
        useSlideInOutValue2.close();
        if (id) {
            const eventId = getEventId();
            if (editChallenge) {
                if (eventId) {
                    await updateEventChallenge(eventId, useCreateChallengeValue.challenge)
                    await updateEventChallengeTestCases(eventId, useCreateChallengeValue.challenge.id!, useCreateChallengeValue.testCases);
                } else {
                    await updateOrganizationChallenge(parseInt(id), useCreateChallengeValue.challenge);
                    await updateOrganizationChallengeTestCases(parseInt(id), useCreateChallengeValue.challenge.id!, useCreateChallengeValue.testCases);
                }
            } else {
                if (eventId) {
                    const newChallenge = await useCreateChallengeValue.createEventChallenge(eventId);
                    if (newChallenge) {
                        appendNewChallenge(newChallenge);
                    }
                } else {
                    const newChallenge = await useCreateChallengeValue.createOrganizationChallenge(parseInt(id));
                    if (newChallenge) {
                        appendNewChallenge(newChallenge);
                    }
                }
            }
        }

        setTimeout(() => {
            close();
            useCreateChallengeValue.resetChallenge();
            setEditChallenge(undefined);
        }, 500);
    }

    return (
        <CreateChallengeContext.Provider value={useCreateChallengeValue}>
            <div className="w-full h-full flex flex-col items-center mt-8">
                <div className="w-full flex flex-col items-center">
                    <h1 className="text-gray-50 text-center font-semibold text-2xl mb-8">{editChallenge ? "Edit Challenge" : "Create New Challenge"}</h1>
                    <div className="w-full md:w-11/12 flex items-center flex-col md:flex-row gap-2 md:gap-0 justify-around">
                        <div className="flex items-center">
                            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-none relative">
                                <CircleLoading isCompleted={currentStep > 0} />
                                {
                                    (currentStep == 0) ? (
                                        <span className="w-12 h-12 bg-white/80 rounded-full flex justify-center items-center text-xl text-gray-950 font-semibold">1</span>
                                    ) : (
                                        <span className="w-12 h-12 bg-white/80 rounded-full flex justify-center items-center text-xl text-green-600 font-semibold">
                                            <Icon icon="material-symbols:check" />
                                        </span>
                                    )
                                }
                            </div>
                            <div className="flex flex-col ml-2">
                                <span className="text-gray-50 font-semibold text-lg">Basic Info</span>
                                <span className="text-gray-300 text-xs">Enter title, topic, level, and privacy settings.</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-none relative">
                                <CircleLoading isCompleted={currentStep > 1} />
                                {
                                    (currentStep <= 1) ? (
                                        <span className="w-12 h-12 bg-white/80 rounded-full flex justify-center items-center text-xl text-gray-950 font-semibold">2</span>
                                    ) : (
                                        <span className="w-12 h-12 bg-white/80 rounded-full flex justify-center items-center text-xl text-green-600 font-semibold">
                                            <Icon icon="material-symbols:check" />
                                        </span>
                                    )
                                }
                            </div>
                            <div className="flex flex-col ml-2">
                                <span className="text-gray-50 font-semibold text-lg">Challenge Details</span>
                                <span className="text-gray-300 text-xs">Write a detailed problem statement and constraints.</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-none relative">
                                <CircleLoading isCompleted={currentStep > 2} />
                                {
                                    (currentStep <= 2) ? (
                                        <span className="w-12 h-12 bg-white/80 rounded-full flex justify-center items-center text-xl text-gray-950 font-semibold">3</span>
                                    ) : (
                                        <span className="w-12 h-12 bg-white/80 rounded-full flex justify-center items-center text-xl text-green-600 font-semibold">
                                            <Icon icon="material-symbols:check" />
                                        </span>
                                    )
                                }
                            </div>
                            <div className="flex flex-col ml-2">
                                <span className="text-gray-50 font-semibold text-lg">Tests & Files</span>
                                <span className="text-gray-300 text-xs">Add test cases and upload any necessary files.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 w-full flex flex-col items-center mt-10">
                    <div className="w-full flex flex-col items-center relative">
                        <div className="absolute left-0 top-0 w-full flex flex-col items-center">
                            <SlideInOut animation={useSlideInOutValue0.slideInOutAnimation}>
                                <BasicInfo />
                                <div className="w-full md:w-fit flex items-center mb-8 mt-4">

                                    <div onClick={goToStep2} className="flex w-full md:w-fit items-center justify-center bg-yellow-600 hover:bg-yellow-700 text-gray-50 px-8 py-1 rounded-lg active:scale-110 duration-300 cursor-pointer mr-2">
                                        Next
                                    </div>
                                </div>
                            </SlideInOut>
                        </div>

                        <div className="absolute left-0 top-0 w-full flex flex-col items-center ">
                            <SlideInOut animation={useSlideInOutValue1.slideInOutAnimation}>
                                <ChallengeDescription />
                                <div className="w-full flex items-center justify-between my-8">
                                    <div
                                        onClick={() => {
                                            setCurrentStep(0);
                                            useSlideInOutValue0.open();
                                            useSlideInOutValue1.back();
                                        }}
                                        className="flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 text-gray-50 px-8 py-1 rounded-lg active:scale-110 duration-300 cursor-pointer mr-2">
                                        Back
                                    </div>
                                    <div
                                        onClick={goToStep3}
                                        className="flex items-center justify-center w-full md:w-fit bg-green-600 hover:bg-green-700 text-gray-50 px-8 py-1 rounded-lg active:scale-110 duration-300 cursor-pointer">Next</div>
                                </div>
                            </SlideInOut>
                        </div>

                        <div className="absolute left-0 top-0 w-full flex flex-col items-center ">
                            <SlideInOut animation={useSlideInOutValue2.slideInOutAnimation}>
                                <TestCasesAndFiles />
                                <div className="w-full flex flex-col md:flex-row items-center justify-between my-8">
                                    <div
                                        onClick={() => {
                                            setCurrentStep(1);
                                            useSlideInOutValue1.open();
                                            useSlideInOutValue2.back();
                                        }}
                                        className="flex items-center w-full md:w-fit justify-center bg-yellow-600 hover:bg-yellow-700 text-gray-50 px-8 py-1 rounded-lg active:scale-110 duration-300 cursor-pointer md:mr-2 mb-2 md:mb-0">
                                        Back
                                    </div>
                                    <div
                                        onClick={createChallengeHandler}
                                        className="flex items-center w-full md:w-fit justify-center bg-green-600 hover:bg-green-700 text-gray-50 px-16 py-1 rounded-lg active:scale-110 duration-300 cursor-pointer">
                                        {editChallenge ? "Update" : "Create"}
                                    </div>
                                </div>
                            </SlideInOut>
                        </div>
                    </div>
                </div>
            </div>
        </CreateChallengeContext.Provider>
    )
}

interface CircleLoadingProps {
    isCompleted: boolean;
};

function CircleLoading({ isCompleted }: CircleLoadingProps) {
    return (
        <svg
            className="w-full h-full absolute left-0 top-0 text-primary-blue  fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >

            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <AnimatePresence>
                {
                    isCompleted && (
                        <motion.circle
                            variants={{
                                open: {
                                    strokeDashoffset: 283 * (1 - 1),
                                    transition: { duration: 1 }
                                },
                                close: {
                                    strokeDashoffset: 283 * (1 - 0),
                                    transition: { duration: 1 }
                                }
                            }}
                            cx="50" cy="50" r="45"
                            fill="none"
                            stroke="#16a34a" stroke-width="10"
                            initial="close"
                            animate="open"
                            exit="close"
                            aria-hidden="true"
                            stroke-dasharray="283"
                            stroke-dashoffset="0"
                        />
                    )}
            </AnimatePresence>
        </svg>
    )
}

interface SlideInOutProps {
    children: React.ReactNode;
    animation: AnimationControls;
};

function SlideInOut({ children, animation }: SlideInOutProps) {
    return (
        <motion.div animate={animation} className="w-full flex-col items-center ml-[100%] hidden opacity-0">
            {children}
        </motion.div>
    )
}