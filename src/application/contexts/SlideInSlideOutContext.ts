import { createContext } from "react";

export default createContext<any>({
    next: () => {},
    back: () => {},
});