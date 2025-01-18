import {useDroppable} from "@dnd-kit/core";
import {useEffect} from "react";

export const Hitbox = ({id}) => {

    const {setNodeRef} = useDroppable({
        id: id,
    })

    return (
        <div id="hitbox" ref={setNodeRef}  className={"absolute w-[620px] h-[111px] -top-20 -left-8"}></div>
    )
}