import {filterContext} from "./filterContext.ts";
import {PropsWithChildren, useState} from "react";

export const FilterProvider = ({children}:PropsWithChildren) => {
    const [selectedFilters,setSelectedFilters] = useState(['barbell','dumbbell','machine','bodyweight','cables','smith machine'])
    return(
        <filterContext.Provider value={{selectedFilters, setSelectedFilters}}>
            {children}
        </filterContext.Provider>
    )
}