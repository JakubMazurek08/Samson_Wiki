import {ProgressBar} from "../components/ProgressBar.tsx";
import {Exercise} from "../components/Exercise.tsx";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "../lib/firebase.ts";
import {collection, getDocs, query} from "firebase/firestore";
import {useNavigate, useParams} from "react-router-dom";
import {WorkoutExercise} from "../components/WorkoutExercise.tsx";

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday","sunday"];
const d = new Date();
const day = days[d.getDay()-1];

export const WorkoutPage = () => {

    const navigate = useNavigate();
    const {planId} = useParams();
    const [trainingDay, setTrainingDay] = useState([]);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(null);
    const [currentSet, setCurrentSet] = useState(1);
    const [name, setName] = useState(null);
    const [userUID, setUserUID] = useState(null);

    const getData = async (uid) => {
        const q = query(collection(db,`users/${uid}/trainingPlans`));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if(doc.id===planId){
                setName(doc.data().name);
                const newTrainingDay =  doc.data().days[day];
                newTrainingDay.push("finished");
                setTrainingDay(newTrainingDay);
                setCurrentExerciseIndex(0);
            }
        });
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

    const finishSet = () => {
        if(currentSet+1>trainingDay[currentExerciseIndex].sets){
            setCurrentExerciseIndex(prevState=>prevState+1);
            setCurrentSet(1);
        }else{
            setCurrentSet(prevState=>prevState+1)
        }
    }


    const skipExercise = () => {
        setCurrentExerciseIndex(prevState=>prevState+1);
        setCurrentSet(1);
    }

    return (
        <>
        {
            userUID ?
                trainingDay ?
                    trainingDay[0]?
                    <main className={"w-full bg-white h-[calc(100vh-5rem)] flex flex-col items-center"}>
                        {trainingDay[currentExerciseIndex]?
                        <div className={"w-[95%] mt-5 flex flex-col items-center"}>
                            <ProgressBar day={day} name={name} totalExercisesNumber={trainingDay.length} currentExerciseNumber={currentExerciseIndex}/>
                            {!(trainingDay[currentExerciseIndex]=="finished")?
                            <>
                            <div className={"w-[85%] h-20 mt-4 flex items-end justify-between"}>
                                <h1 className={"w-1/2 text-5xl text-primary-medium font-bold"}>{trainingDay[currentExerciseIndex].name}</h1>
                                <h1>
                                    <span className={"w-96 text-7xl text-primary-medium font-bold"}>{currentSet}/{trainingDay[currentExerciseIndex].sets}</span>
                                    <span className={"w-96 text-4xl text-primary-medium font-bold"}>{trainingDay[currentExerciseIndex].minReps}-{trainingDay[currentExerciseIndex].maxReps}reps</span>
                                </h1>
                            </div>
                            <WorkoutExercise currentExerciseName={trainingDay[currentExerciseIndex].name}/>
                            <div className={"w-full flex justify-center mt-8"}>
                                <button
                                    onClick={finishSet}
                                className={`w-80 bg-primary-light rounded-md text-white font-bold text-4xl h-20 hover:bg-primary-medium transition-transform duration-300 hover:scale-110`}>
                                    Finished Set
                                </button>
                            </div>
                            <div className={"w-full flex justify-between"}>
                                <button onClick={skipExercise} className={"text-[#BBB] font-bold text-3xl transition-all duration-200 hover:text-[#AAA]"}>Skip Exercise</button>
                            </div>
                            </>
                            :
                                <>
                                    <h1 className={"text-primary-medium font-bold text-4xl m-20"}>Well Done, You have
                                        finished training for today!</h1>
                                    <button
                                        onClick={()=>{navigate("/plans")}}
                                        className={`w-80 bg-primary-light rounded-md text-white font-bold text-4xl h-20 hover:bg-primary-medium transition-transform duration-300 hover:scale-110`}>
                                        Go Back
                                    </button>
                                </>
                            }
                        </div>
                            :
                            null}
                    </main>
                        :
                        <h1 className={"text-8xl font-bold text-primary-medium"}>Today is your rest day</h1>
                    :
                    <h1>Loading...</h1>
                :
                <h1>u need to be logged in</h1>
        }
        </>
    )
}