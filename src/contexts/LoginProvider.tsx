import {loginContext} from "./loginContext.ts";
import {PropsWithChildren, useState} from "react";

export const LoginProvider = ({children}:PropsWithChildren) => {
    const [alreadyLoggingIn, setAlreadyLoggingIn] = useState(false);

    const setIsLoginTrue = () => {
        setAlreadyLoggingIn(true);
    }

    const setIsLoginFalse = () => {
        setAlreadyLoggingIn(false);
    }

    return(
        <loginContext.Provider value={{alreadyLoggingIn, setIsLoginTrue, setIsLoginFalse}}>
            {children}
        </loginContext.Provider>
    )
}