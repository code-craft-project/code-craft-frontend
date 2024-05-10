export const popupVariants = {
    open: {
      opacity: 1,
      width: "100%",
      height: "100%",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      opacity: 0,
      width: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

export const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export const cardVariants = {
  hidden: { y: -10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};