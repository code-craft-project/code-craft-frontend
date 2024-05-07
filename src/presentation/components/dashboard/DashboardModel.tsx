import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";
import { useDashboardModelReturn } from "../../../application/hooks/useDashboardModel";
import { DashboardModelContext } from "../../../application/contexts/DashboardModelContext";

interface DashboardModelProps {
    children: React.ReactNode;
    useDashboardModel: useDashboardModelReturn;
};

export default function DashboardModel({ children, useDashboardModel }: DashboardModelProps) {
    const { isOpen, close } = useDashboardModel;

    return (
        <DashboardModelContext.Provider value={useDashboardModel}>
            <AnimatePresence>
                {
                    isOpen && (
                        <motion.div
                            variants={{
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
                                },
                            }}
                            initial="close"
                            animate="open"
                            exit="close"
                            className="w-full h-screen bg-black/20 overflow-auto flex flex-col items-center absolute top-0 left-0 backdrop-blur-sm"
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