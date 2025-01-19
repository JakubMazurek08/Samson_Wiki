import {useForm} from "react-hook-form";
import {useState} from "react";
import {db} from "../lib/firebase.ts";
import {doc, deleteDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";


export const TrainingPlan = ({name, id, userUID, getData}) => {
    const navigate = useNavigate();
    const [isVerifyDelete, setIsVerifyDelete] = useState(false)

    const deleteTrainingPlan = async () => {
        try {
            const docRef = doc(db, `users/${userUID}/trainingPlans`, id);
            await deleteDoc(docRef);
            setIsVerifyDelete(false);
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    }

    const {register, handleSubmit} = useForm();

    const handleVerifyDelete = ({nameToDelete}) => {
        console.log(name == nameToDelete)
        if (name == nameToDelete) {
            deleteTrainingPlan();
            getData(userUID);
        } else {
            setIsVerifyDelete(false);
        }
    }

    return (
        <>
            {isVerifyDelete ? (
                    <main
                        className={`fixed w-screen h-screen top-0 left-0 items-center justify-center bg-primary-transparent flex z-50`}>
                        <form onSubmit={handleSubmit(handleVerifyDelete)}
                              className={"flex flex-col gap-4 rounded-3xl w-[400px] p-10 bg-true-white"}>
                            <h1 className={"text-4xl text-primary-medium"}>ARE YOU SURE THAT YOU WANT TO DELETE PLAN?</h1>
                            <input  {...register("nameToDelete", {required: true})}
                                    className={`mt-1 p-2 border-primary-light border-2 rounded-md`}
                                    placeholder={"ENTER TRAINING PLAN NAME TO DELETE..."}/>
                            <button type={"submit"}
                                    className={`w-40 bg-primary-light rounded-md text-white font-bold text-3xl h-12 hover:bg-primary-medium transition-transform duration-300 hover:scale-110`}>Delete
                            </button>
                            <button
                                onClick={() => {
                                    setIsVerifyDelete(false)
                                }}
                                className={`w-40 bg-primary-light rounded-md text-white font-bold text-3xl h-12 hover:bg-primary-medium transition-transform duration-300 hover:scale-110`}>Cancel
                            </button>
                        </form>
                    </main>
                )
                : null}
            <div className={"w-[420px] border-primary-medium border-2 rounded-2xl h-[200px]"}>
                <div
                    className={"bg-primary-light rounded-t-[14px] h-16 text-secondary-light font-bold text-4xl flex flex-row justify-between p-2"}>
                    <h1>{name}</h1>
                    <img onClick={() => {
                        setIsVerifyDelete(true)
                    }} src="/icons/delete.png" alt=""/>
                </div>
                <div className={"flex justify-around  mt-10"}>
                <button
                    onClick={() => {
                        navigate(`/workout/${id}`);
                    }}
                    className={`w-40 bg-primary-light rounded-md text-white font-bold text-3xl h-12 hover:bg-primary-medium transition-transform duration-300 hover:scale-110`}>Workout
                </button>
                <button
                    onClick={() => {
                        navigate(`/plans/${id}`);
                    }}
                    className={`w-40 bg-primary-light rounded-md text-white font-bold text-3xl h-12  hover:bg-primary-medium transition-transform duration-300 hover:scale-110`}>Edit
                </button>
                </div>
            </div>
        </>
    )
}