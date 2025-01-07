import {filterContext} from "./filterContext.ts";
import {PropsWithChildren, useState} from "react";

export const FilterProvider = ({children}:PropsWithChildren) => {
    const [selectedFilters,setSelectedFilters] = useState(['barbell','dumbbell','machine','bodyweight','cables','smith machine'])

    const updateFilters = (filters) => {
        setSelectedFilters(filters)
        console.log(filters)
    }
    return(
        <filterContext.Provider value={{selectedFilters, updateFilters}}>
            {children}
        </filterContext.Provider>
    )
}