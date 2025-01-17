import {useDroppable} from "@dnd-kit/core";

export const Hitbox = ({id}) => {
    const {setNodeRef} = useDroppable({
        id: id,
    })

    return (
        <div id="hitbox" ref={setNodeRef} className={"absolute w-[620px] h-32 -top-10 -left-8"}></div>
    )
}