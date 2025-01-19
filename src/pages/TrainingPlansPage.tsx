import {collection, doc, getDocs, query, setDoc} from "firebase/firestore";
import {auth, db} from "../lib/firebase.ts";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {useForm} from "react-hook-form";
import {TrainingPlan} from "../components/TrainingPlan.tsx";

export const TrainingPlansPage = () => {
    const [userUID, setUserUID] = useState(null);
    const [isAddingNewTrainingPlan, setIsAddingNewTrainingPlan] = useState(false);
    const [trainingPlans, setTrainingPlans] = useState([]);


    const getData = async (uid) => {
        const q = query(collection(db,`users/${uid}/trainingPlans`));
        const querySnapshot = await getDocs(q);
        const newData = [];
        querySnapshot.forEach((doc) => {
            newData.push([doc.data(),doc.id]);
        });
        setTrainingPlans(newData);
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

    const addTrainingPlan = async ({name}) => {
        if(!name) return
        try {
            const trainingPlanCollectionRef = collection(db, `users/${userUID}/trainingPlans`);
            await setDoc(doc(trainingPlanCollectionRef), {
                 name:name,
                 days: {
                     monday: [],
                     tuesday: [],
                     wednesday: [],
                     thursday: [],
                     friday: [],
                     saturday: [],
                     sunday: [],
                 }
            });
            getData(userUID);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        setIsAddingNewTrainingPlan(false);
    };

    const {register, handleSubmit} = useForm();
    return(
        <>
            {isAddingNewTrainingPlan?(
                    <main
                        className={`fixed w-screen h-screen top-0 left-0 items-center justify-center bg-primary-transparent flex z-50`}>
                        <form onSubmit={handleSubmit(addTrainingPlan)} className={"flex flex-col gap-4 rounded-3xl w-[400px] p-10 bg-true-white"}>
                            <h1 className={"text-4xl text-primary-medium"}>Add New Plan</h1>
                            <input  {...register("name", {required: true})}
                                   className={`mt-1 p-2 border-primary-light border-2 rounded-md`}
                                   placeholder={"Plan name..."}/>
                            <button type={"submit"}
                                className={`w-40 bg-primary-light rounded-md text-white font-bold text-3xl h-12 hover:bg-primary-medium transition-transform duration-300 hover:scale-110`}>Add</button>
                            <button
                                onClick={()=>{setIsAddingNewTrainingPlan(false)}}
                                className={`w-40 bg-primary-light rounded-md text-white font-bold text-3xl h-12 hover:bg-primary-medium transition-transform duration-300 hover:scale-110`}>Cancel</button>
                        </form>
                    </main>
                )
                : null}
            {userUID ?
                <main className={"p-10 bg-white w-full h-[calc(100vh-5rem)] flex flex-col relative"}>
                    <div className="w-full flex justify-between items-center">
                        <h1 className={"text-primary-medium text-6xl font-black"}>Training Plans:</h1>
                        <img onClick={() => {
                            setIsAddingNewTrainingPlan(true)
                        }} className={"h-[80px]"} src="/icons/more.png" alt=""/>
            </div>
            <div className={"w-full mt-10 border-primary-medium border-x-4 border-t-4 rounded-3xl flex-1 p-10 flex flex-wrap flex-row  gap-20 "}>
                {trainingPlans[0]?
                    trainingPlans.map((trainingPlan) => (
                        <TrainingPlan name={trainingPlan[0].name} id={trainingPlan[1]} key={trainingPlan[1]} userUID={userUID} getData={getData} />
                    ))
                :<h1>no plans yet</h1>}
            </div>

        </main>
                :
                <h1>u need to be logged in</h1>
            }

        </>
    )
}