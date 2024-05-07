import { useState } from "react";

export interface useDashboardModelReturn {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export default function useDashboardModel(): useDashboardModelReturn {
    const [isOpen, setIsOpen] = useState(false);

    const open = (): void => {
        setIsOpen(true);
    }

    const close = (): void => {
        setIsOpen(false);
    }

    return {
        isOpen, open, close
    }
}