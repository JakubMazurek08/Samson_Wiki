import {useDraggable} from "@dnd-kit/core";
import {Hitbox} from "./Hitbox.tsx";
import {useEffect, useState} from "react";

export const ExercisePiece = ({name, isInStack,id,index}) => {

    // const [sets,setSets] = useState(3);
    // const [minReps,setMinReps] = useState(8);
    // const [maxReps,setMaxReps] = useState(12);

    const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
        id:id,
    })

    const transformYOffset = index*130

    const style = transform ? {
        position: "absolute",
        top: `${transformYOffset+150}px`,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex:500,
    } : undefined;


    return (
        <>
            <div   ref={id.includes("*") ? null : setNodeRef}
                   {...(id.includes("*") ? {} : listeners)}
                   {...(id.includes("*") ? {} : attributes)}
                 style={style}
                 className={"relative -mt-1"}>
                <svg className={"fill-primary-light "} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550 125"
                     height={125}>
                    <rect x="326.35" y="0" width="91.59" height="18.59" rx="8.28" ry="8.28"/>
                    <path
                        d="M550,25.84v84.38c0,8.16-6.62,14.78-14.78,14.78h-117.28v-1.02c0-4.57-3.71-8.27-8.28-8.27h-75.04c-4.57,0-8.27,3.7-8.27,8.27v1.02H14.78c-8.16,0-14.78-6.62-14.78-14.78V25.84c0-8.16,6.62-14.78,14.78-14.78h520.44c8.16,0,14.78,6.62,14.78,14.78Z"/>
                </svg>
                <div className={"absolute w-full h-full flex items-end p-2 top-0 left-0"}>
                    <h1 className={"text-white text-4xl font-bold w-80 py-4 h-full "}>{name}</h1>
                </div>
                {/*{isInStack?*/}
                {/*<div className={"absolute flex left-[430px] top-14"}>*/}
                {/*    <NumberPicker state={sets} setState={setSets} max={99} min={0}></NumberPicker>*/}
                {/*    <h1>X</h1>*/}
                {/*    <NumberPicker state={minReps} setState={setMinReps} max={maxReps-1} min={0}></NumberPicker>*/}
                {/*    <h1>-</h1>*/}
                {/*    <NumberPicker state={maxReps} setState={setMaxReps} max={99} min={minReps+1}></NumberPicker>*/}
                {/*</div>*/}
                {/*: null}*/}
                {isInStack ? <Hitbox id={id}/>:null}
            </div>
        </>
    )
}

const NumberPicker = ({state, setState, min, max}) => {
    return(
        <div className="flex flex-col items-center">
            <img onClick={setState((prevState=>{
                if((prevState+1)<=max){
                    return prevState+1
                }else{
                    return prevState
                }
            }))} className={"w-4 rotate-45 cursor-pointer"} src="/src/assets/icons/right-arrow.png" alt=""/>
            <h1 className={"text-3xl font-bold text-white"}>{state}</h1>
            <img onClick={setState((prevState=> {
                if ((prevState - 1) >= min) {
                    return prevState - 1
                } else {
                    return prevState
                }
            }))} className={"w-4 -rotate-45 cursor-pointer"} src="/src/assets/icons/right-arrow.png" alt=""/>
        </div>
    )

}