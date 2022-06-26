import { createContext, useState } from "react";
import Loader from "../components/loader";

export const LoadingContext = createContext();

export const LoadingContextProvider = ({ children }) => {
    const [state, setState] = useState(false);

    const loadingShow = () => {
        setState(true);
    }

    const loadingHide = () => {
        setState(false);
    }

    return (
        <LoadingContext.Provider value={{
            loadingShow,
            loadingHide
        }}>
            {
                state && <Loader />
            }
            {children}
        </LoadingContext.Provider>
    )
}
