import {useContext} from "react";
import {loginContext} from "./loginContext.ts";

export const useLogin = () => {
    const context = useContext(loginContext);

    if(!context){
        throw new Error("uselogin is outside login provider");
    }
    return context;
};