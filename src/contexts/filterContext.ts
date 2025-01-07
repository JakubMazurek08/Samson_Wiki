import {createContext} from "react";

type filterContextResult = {
    selectedFilters : any;
    updateFilters : () => {},
}
export const filterContext = createContext<filterContextResult|null>(null);