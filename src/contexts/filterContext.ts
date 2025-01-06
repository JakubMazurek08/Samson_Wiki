import {createContext} from "react";

type filterContextResult = {
    selectedFilters : string[];
}

export const filterContext = createContext<filterContextResult|null>(null);