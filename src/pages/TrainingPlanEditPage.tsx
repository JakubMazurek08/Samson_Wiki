import {useEffect, useState} from "react";
import {collection, getDocs, query} from "firebase/firestore";
import {auth, db} from "../lib/firebase.ts";
import {useParams} from "react-router-dom";
import {onAuthStateChanged} from "firebase/auth";
import {WeekDaySelector} from "../components/WeekDaySelector.tsx";
import {TrainingPlanBlockDisplay} from "../components/TrainingPlanBlockDisplay.tsx";
import {ExercisePieceDropDown} from "../components/ExercisePieceDropDown.tsx";
import {EquipmentFilterDropdown} from "../components/EquipmentFilterDropdown.tsx";
import {ManFront} from "../components/ManFront.tsx";
import {ManBack} from "../components/ManBack.tsx";
import {DndContext, DragEndEvent} from "@dnd-kit/core";

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday","sunday"];

export const TrainingPlanEditPage = () => {
    const {planId} = useParams();

    const [userUID, setUserUID] = useState(null);
    const [trainingPlan, setTrainingPlan] = useState(null);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedMuscle, setSelectedMuscle] = useState("chest");
    const [isDragging, setIsDragging] = useState(false);

    function handleDragEnd(event:DragEndEvent){
        const {active, over} = event;

        if(!over) return;

        console.log(active,over)

        const draggedExerciseId = active.id as string;
        const droppedOnId = over.id as string;

        console.log(draggedExerciseId, droppedOnId);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUserUID(uid);
                getData(uid);
            } else {
                setUserUID(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const getData = async (uid) => {
        const q = query(collection(db,`users/${uid}/trainingPlans`));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if(doc.id===planId){
                setTrainingPlan(doc.data());
            }
        });
    }

    return(
        <DndContext onDragEnd={handleDragEnd}>
        {
            userUID?
                trainingPlan?
            <main className="w-full flex ">
                <div className={"w-8/12 h-[calc(100vh-5rem)] border-r-4 border-primary-medium p-6 bg-white"}>
                    <h1 className={"text-primary-medium text-6xl font-bold isD"}>Editing Plan "{trainingPlan.name}" :</h1>
                    <WeekDaySelector selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
                    <TrainingPlanBlockDisplay exercises={trainingPlan.days[days[selectedDay]]}/>
                </div>
                <div className={"w-4/12 h-[calc(100vh-5rem)] bg-white flex flex-col items-center p-6"}>
                    <ExercisePieceDropDown muscle={selectedMuscle}/>
                    <div className={"bg-primary-light p-2 flex rounded-[32px]"}>
                        <div className={"min-h-40 bg-true-white rounded-3xl w-[350px] justify-around flex p-2 justify-around"}>
                            <ManFront primary={selectedMuscle} setSelectedMuscle={setSelectedMuscle} dontChangeURL={true} height={290}/>
                            <ManBack primary={selectedMuscle} setSelectedMuscle={setSelectedMuscle}  dontChangeURL={true} height={290}/>
                        </div>
                        <EquipmentFilterDropdown isDropped={true}/>
                    </div>
                </div>
            </main>
                    :
                    <h1>Loading...</h1>
                :
                <h1>u need to be logged in</h1>
        }
        </DndContext>
    )
}