import { useAnimation } from "framer-motion"

export default function useSlideInOut() {
    const slideInOutAnimation = useAnimation();

    const open = () => {
        slideInOutAnimation.set({ display: 'flex' });
        slideInOutAnimation.start({
            marginLeft: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        });
    }

    const close = () => {
        slideInOutAnimation.start({
            marginLeft: "-220%",
            opacity: 0,
            transition: { duration: 0.5 },
        }).then(() => {
            slideInOutAnimation.set({
                display: 'none'
            })
        });
    }

    const back = () => {
        slideInOutAnimation.start({
            marginLeft: "220%",
            opacity: 0,
            transition: { duration: 0.5 },
        }).then(() => {
            slideInOutAnimation.set({
                display: 'none'
            })
        });
    }

    return {
        slideInOutAnimation, open, close, back
    }
}