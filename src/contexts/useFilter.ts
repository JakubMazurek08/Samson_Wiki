import {useContext} from "react";
import {filterContext} from "./filterContext.ts";

export const useFilter = () => {
    const context = useContext(filterContext);

    if(!context){
        throw new Error("useFilter is outside filter provider");
    }
    return context;
};