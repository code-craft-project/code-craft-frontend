import { createContext } from "react";
import { useDashboardModelReturn } from "../hooks/useDashboardModel";

export const DashboardModelContext = createContext<useDashboardModelReturn>({
    isOpen: false,
    open: () => { },
    close: () => { }
});