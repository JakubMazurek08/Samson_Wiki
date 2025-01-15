import {db} from "../lib/firebase.ts";
import {useEffect, useState} from "react";
import {collection,query,where,and,or,getDocs} from "firebase/firestore"
import {useParams} from "react-router-dom";
import {Exercise} from "./Exercise.tsx";
import {v4} from "uuid";
import {useFilter} from "../contexts/useFilter.ts";
import {ManFront} from "../components/ManFront.tsx";
import {ManBack} from "../components/ManBack.tsx";
import {useForm} from "react-hook-form";
import {Checkbox} from "../components/Checkbox.tsx";


function capitalizeWords(inputString) {
    return inputString
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
export const ExercisesByMuscle = () => {
    const {selectedFilters, updateFilters} = useFilter();
    const {muscle} = useParams();
    const [data,setData] = useState([]);
    const {register, handleSubmit, watch} = useForm();

    useEffect(() => {
        const getData = async () => {
            const q = query(collection(db,"exercises"),and(or(where("primary","==",muscle),where("secondary","==",muscle),where("ternary","==",muscle)),where("equipment","in",selectedFilters)))
            const querySnapshot = await getDocs(q);
            const newData = [];
            querySnapshot.forEach((doc) => {
                newData.push(doc.data())
            });
            setData(newData);
        }
        getData();
    }, [muscle, selectedFilters]);

    useEffect(() => {
        const subscription = watch(handleSubmit(submit));
        return () => subscription.unsubscribe();
    }, [handleSubmit,watch]);

    const submit = (data) => {
        const filters = [];
        Object.keys(data).forEach((key) => {
            if(data[key]){
                filters.push(key);
            }
        });
        updateFilters(filters);
    }


    return (
        <main className={"flex flex-col lg:items-start  items-center"}>
        <div className={"w-96 2xl:fixed 2xl:right-32 2xl:z-10 lg:ml-20"}>
            <h1 className={"text-7xl text-primary-medium font-bold font-playfair"}>{muscle == "lower-back" ? "Lower back" : null}{muscle == "upper-back" ? "Upper back" : null} {muscle != "lower-back" && muscle != "upper-back" ? capitalizeWords(muscle) : null}</h1>
            <div className={"w-96 min-h-80 bg-primary-light rounded-[32px] mt-2 border-primary-light border-8"}>
                <div className={"w-full min-h-40 bg-true-white rounded-3xl flex p-2 justify-around"}>
                    <ManFront primary={muscle} height={290}/>
                    <ManBack primary={muscle} height={290}/>
                </div>
                <form className="bg-primary-light">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <Checkbox label={"Barbell"} name={"barbell"} register={register} />
                        <Checkbox label={"Machine"} name={"machine"} register={register} />
                        <Checkbox label={"Smith machine"} name={"smith machine"} register={register} />
                        <Checkbox label={"Dumbbell"} name={"dumbbell"} register={register} />
                        <Checkbox label={"Cables"} name={"cables"} register={register} />
                        <Checkbox label={"Bodyweight"} name={"bodyweight"} register={register} />
                    </div>
                </form>
            </div>
        </div>
    <main className={"flex p-8 gap-8"}>
        <div className={"w-full lg:w-2/3  flex flex-col gap-8 z-20"}>
            {data[0] ?
                data.map((exercise) => {
                    return <Exercise exerciseData={exercise} key={v4()}/>
                })
                :
                <h1 className={"font-bold text-5xl"}>loading exercises. ..</h1>}
        </div>

    </main>
        </main>
)
}