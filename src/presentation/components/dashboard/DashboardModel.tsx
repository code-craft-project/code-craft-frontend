import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useDashboardModelReturn } from "../../../application/hooks/useDashboardModel";
import { DashboardModelContext } from "../../../application/contexts/DashboardModelContext";

interface DashboardModelProps {
    children: React.ReactNode;
    useDashboardModel: useDashboardModelReturn;
    animationName?: AnimationName;
};

type AnimationName = 'CenterScaleFadeIn' | 'EdgeScaleFadeIn'

export default function DashboardModel({ children, useDashboardModel, animationName = 'CenterScaleFadeIn' }: DashboardModelProps) {
    const { isOpen, close } = useDashboardModel;

    console.log("animations[animationName]:", animations[animationName]);

    return (
        <DashboardModelContext.Provider value={useDashboardModel}>
            <AnimatePresence>
                {
                    isOpen && (
                        <motion.div
                            variants={animations[animationName]}
                            initial="close"
                            animate="open"
                            exit="close"
                            className="w-full mt-16 md:mt-0 h-screen bg-black/20 overflow-auto flex flex-col items-center absolute top-0 left-0 backdrop-blur-sm"
                        >
                            <div className="w-11/12 flex items-center flex-nowrap justify-between py-4">
                                <div></div>
                                <div onClick={() => close()} className="text-2xl bg-yellow-600 rounded-full p-1 cursor-pointer hover:bg-yellow-700 active:scale-110 duration-300">
                                    <Icon icon="material-symbols:close" />
                                </div>
                            </div>
                            <div className="w-11/12 flex flex-col items-center">
                                {children}
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </DashboardModelContext.Provider>
    )
}

type AnimationNamesMap = {
    [key in AnimationName]: Variants;
};

const animations: AnimationNamesMap = {
    EdgeScaleFadeIn: {
        open: {
            opacity: 1,
            width: "100%",
            height: "100%",
            transition: { duration: 0.3, ease: "easeInOut" },
        },
        close: {
            opacity: 0,
            width: 0,
            height: 0,
            transition: { duration: 0.3, ease: "easeInOut" },
        }
    },
    CenterScaleFadeIn: {
        open: {
            opacity: 1,
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            transition: { duration: 0.3, ease: "easeOut" },
        },
        close: {
            opacity: 0,
            width: "60%",
            height: "60%",
            left: "20%",
            top: "20%",
            transition: { duration: 0.3, ease: "easeOut" },
        }
    }
}