import {useDraggable} from "@dnd-kit/core";
import {Hitbox} from "./Hitbox.tsx";
import {useEffect, useState} from "react";

export const ExercisePiece = ({name, isInStack,id,index}) => {

    const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
        id:id,
    })

    const transformYOffset = index*130

    const style = transform ? {
        position: "absolute",
        transform: `translate3d(${transform.x}px, ${transform.y+transformYOffset+40}px, 0)`,
        zIndex:500,
    } : undefined;

    return (
        <>
            <div   ref={id.includes("*") ? null : setNodeRef}
                   {...(id.includes("*") ? {} : listeners)}
                   {...(id.includes("*") ? {} : attributes)}
                 style={style}
                 className={"relative -mt-1"}>
                <svg className={"fill-primary-light"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550 125"
                     height={125}>
                    <rect x="326.35" y="0" width="91.59" height="18.59" rx="8.28" ry="8.28"/>
                    <path
                        d="M550,25.84v84.38c0,8.16-6.62,14.78-14.78,14.78h-117.28v-1.02c0-4.57-3.71-8.27-8.28-8.27h-75.04c-4.57,0-8.27,3.7-8.27,8.27v1.02H14.78c-8.16,0-14.78-6.62-14.78-14.78V25.84c0-8.16,6.62-14.78,14.78-14.78h520.44c8.16,0,14.78,6.62,14.78,14.78Z"/>
                </svg>
                <div className={"absolute w-full h-full flex items-end p-2 top-0 left-0"}>
                    <h1 className={"text-white text-4xl font-bold w-80 py-4 h-full "}>{name}</h1>
                </div>
                {isInStack ? <Hitbox id={id}/>:null}
            </div>
        </>
    )
}