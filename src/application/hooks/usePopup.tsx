import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { popupVariants } from "../data/FramerVariants";
import JobPostForm from "../../presentation/components/JobPostForm";
import { Icon } from "@iconify/react/dist/iconify.js";

const usePopup = (popupContentOptions: PopupContent): PopupProps => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const ElementChoosedToRender = {
    jobPost: <JobPostForm jobPostId={popupContentOptions.id} formType={popupContentOptions?.method} />
  }
  return {
    children: (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={popupVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed overflow-auto  inset-0 bg-black/60 backdrop-blur z-50 flex py-5 items-start justify-around"
          >
            {
              popupContentOptions.title == 'event'
                ? ""
                : ElementChoosedToRender.jobPost
            }
            <div className="p-1 rounded-lg hover:border transition-all duration-200  hover:border-white hover:bg-white/40 " onClick={closePopup}>
              <Icon icon="material-symbols:close" width="32" height="32" className="text-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    ),
    onclose: closePopup,
    onopen: openPopup,
    open: isOpen,
  };
};

export default usePopup;