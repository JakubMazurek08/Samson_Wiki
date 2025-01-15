import {TrainingPlan} from "../components/TrainingPlan.tsx";
import {collection, doc, setDoc} from "firebase/firestore";
import {auth, db} from "../lib/firebase.ts";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";

export const TrainingPlansPage = () => {
    const [userUID, setUserUID] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log("logged in as: ", uid);
                setUserUID(uid);
            } else {
                setUserUID(null);
            }
        });

        return () => unsubscribe();
    }, []);


    const addTrainingPlan = async (name) => {
        try {
            const trainingPlanCollectionRef = collection(db, `Users/${userUID}/trainingPlans`);
            await setDoc(doc(trainingPlanCollectionRef), {
                 name:name,
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return(
        <>
        <main className={"p-10 w-full h-[calc(100vh-5rem)] flex flex-col relative"}>
            <div className="w-full flex">
            <h1 className={"text-primary-medium text-6xl font-black"}>Training Plans:</h1>
            </div>
            <div className={"w-full mt-10 border-primary-medium border-x-4 border-t-4 rounded-3xl flex-1 p-10 flex flex-wrap flex-row  gap-20 "}>
                {userUID ?
                        <h1>skibidi toaleta</h1>
                :
                    <h1>u need to be logged in</h1>
                }
            </div>
        </main>
        </>
    )
}