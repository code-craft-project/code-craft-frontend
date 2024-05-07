import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";

interface ImageModalProps {
    showModal: boolean;
    onClose: () => void;
    imageSrc: string | undefined;
    title: string;
}

const ImageModal = ({ showModal, onClose, imageSrc, title }: ImageModalProps) => {
    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center text-black w-screen h-screen bg-black/55"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className=" rounded-lg p-6 shadow-md flex  items-start gap-5 w-1/2 h-1/2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img src={imageSrc} alt={title} className="w-full max-h-96 object-contain" />
                        <motion.button
                            onClick={onClose}
                            className="p-5"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Icon icon="material-symbols:close" width="24" height="24" className="hover:text-primary-blue text-white hover:bg-white/35  rounded-md"/>
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ImageModal;