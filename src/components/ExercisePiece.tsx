import {useDraggable} from "@dnd-kit/core";
import {Hitbox} from "./Hitbox.tsx";
import {useEffect, useState} from "react";

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday","sunday"];

export const ExercisePiece = ({exercise, isInStack,id,index, setTrainingPlan,currentDay, setSaved}) => {
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

    const deleteExercise = () => {
        const day = days[currentDay];
        const indexToDelete = id.split("*")[1]-1;
        console.log(`deleteing index, ${indexToDelete}`)
        setTrainingPlan((prevState) => {
            const updatedDays = { ...prevState.days };

            if (updatedDays[day] && updatedDays[day].length > indexToDelete) {
                updatedDays[day] = [
                    ...updatedDays[day].slice(0, indexToDelete),
                    ...updatedDays[day].slice(indexToDelete + 1),
                ];
            }

            return { ...prevState, days: updatedDays };
        });
    }

    const moveUp = () => {
        const day = days[currentDay];
        const indexToMove = id.split("*")[1]-1;
        setTrainingPlan(prevState => {
            const exercises = [...prevState.days[day]];

            if (indexToMove < exercises.length-1) {
                const temp = exercises[indexToMove];
                exercises[indexToMove] = exercises[indexToMove + 1];
                exercises[indexToMove + 1] = temp;
            }

            return {
                ...prevState,
                days: {
                    ...prevState.days,
                    [day]: exercises
                }
            };
        });
    }

    const moveDown = () => {
        const day = days[currentDay];
        const indexToMove = id.split("*")[1]-1;
        setTrainingPlan(prevState => {
            const exercises = [...prevState.days[day]];

            if (indexToMove > 0) {
                const temp = exercises[indexToMove];
                exercises[indexToMove] = exercises[indexToMove - 1];
                exercises[indexToMove - 1] = temp;
            }

            return {
                ...prevState,
                days: {
                    ...prevState.days,
                    [day]: exercises
                }
            };
        });
    }

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
                    <h1 className={"text-white text-4xl font-bold w-80 py-4 h-full "}>{exercise.name}</h1>
                </div>
                {isInStack?
                    <>
                <div className={"absolute flex left-[420px] top-10"}>
                    <NumberPicker state={"sets"} exercise={exercise} id={id} setSaved={setSaved} setTrainingPlan={setTrainingPlan} currentDay={currentDay} max={99} min={1}></NumberPicker>
                    <h1 className={"mt-4 text-white text-3xl"}>X</h1>
                    <NumberPicker state={"minReps"} exercise={exercise} id={id} setSaved={setSaved} setTrainingPlan={setTrainingPlan} currentDay={currentDay} max={exercise.maxReps-1} min={1}></NumberPicker>
                    <h1 className={"mt-4 text-white text-3xl"}>-</h1>
                    <NumberPicker state={"maxReps"} exercise={exercise} id={id} setSaved={setSaved} setTrainingPlan={setTrainingPlan} currentDay={currentDay} max={99} min={exercise.minReps+1}></NumberPicker>
                </div>
                <h1 className={"absolute text-white left-[420px] top-3  flex gap-3"}> <span>sets</span> <span>rep range</span> </h1>
                    </>
                : null}
                {isInStack?
                    <>
                    <div className={"absolute top-5 left-[350px] flex flex-col"}>
                        <img onClick={moveUp} className={"w-10 -rotate-90 cursor-pointer"}
                             src="/src/assets/icons/right-arrow.png" alt=""/>

                        <img onClick={moveDown} className={"w-10 rotate-90 cursor-pointer"}
                             src="/src/assets/icons/right-arrow.png" alt=""/>
                    </div>
                    <div className={"absolute bottom-4 left-[395px]"}>
                        <img onClick={deleteExercise} className={"w-4  cursor-pointer"}
                             src="/src/assets/icons/delete.png" alt=""/>
                    </div>
                    </>
                    :
                    null
                }
                {isInStack ? <Hitbox id={id}/> : null}
            </div>
        </>
    )
}

const NumberPicker = ({exercise, state, setTrainingPlan, min, max, currentDay, id, setSaved}) => {

    const increment = () => {
        const index = id.split("*")[1]-1;
        setTrainingPlan((prevState) => ({
            ...prevState,
            days: {
                ...prevState.days,
                [days[currentDay]]: prevState.days[days[currentDay]].map((exercise, i) =>
                    i === index
                    ?
                        {
                            ...exercise,
                            [state]:
                                exercise[state] < max ? exercise[state] + 1 : exercise[state],
                        }:
                    exercise

                ),
            },
        }));

        setSaved(false);
    };
    const decrement = () => {
        const index = id.split("*")[1]-1;
        setTrainingPlan((prevState) => ({
            ...prevState,
            days: {
                ...prevState.days,
                [days[currentDay]]: prevState.days[days[currentDay]].map((exercise, i) =>
                    i === index
                        ?
                        {
                            ...exercise,
                            [state]:
                                exercise[state] > min ? exercise[state] - 1 : exercise[state],
                        }:
                        exercise

                ),
            },
        }));

        setSaved(false);
    }
    return(
        <div className="flex flex-col items-center">
            <img onClick={increment} className={"w-6 -rotate-90 cursor-pointer"} src="/src/assets/icons/right-arrow.png" alt=""/>
            <h1 className={"text-3xl font-bold text-white -my-2"}>{exercise[state]}</h1>
            <img onClick={decrement} className={"w-6 rotate-90 cursor-pointer"} src="/src/assets/icons/right-arrow.png" alt=""/>
        </div>
    )

}