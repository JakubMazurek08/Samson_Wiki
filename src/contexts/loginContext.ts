import {createContext} from "react";

type LoginContextResult = {
    alreadyLoggingIn : boolean;
    setIsLoginTrue: () => (void);
    setIsLoginFalse: () => (void);
}
export const loginContext = createContext<LoginContextResult|null>(null);