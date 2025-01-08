import {db} from "../lib/firebase.ts";
import {useEffect, useState} from "react";
import {collection,query,where,and,getDocs} from "firebase/firestore"
import {useParams} from "react-router-dom";
import {Exercise} from "./Exercise.tsx";
import {v4} from "uuid";
import {useFilter} from "../contexts/useFilter.ts";

export const ExercisesByMuscle = () => {
    const {selectedFilters} = useFilter();
    const {muscle} = useParams();
    const [data,setData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const q = query(collection(db,"exercises"),and(where("primary","==",muscle),where("equipment","in",selectedFilters)))
            const querySnapshot = await getDocs(q);
            const newData = [];
            querySnapshot.forEach((doc) => {
                newData.push(doc.data())
            });
            setData(newData);
        }
        getData();
    }, []);

    return(
        <>
            <div className={"w-2/3 m-8 flex flex-col gap-8"}>
        {data[0]?
            data.map((exercise)=>{
                return <Exercise exerciseData={exercise} key={v4()}/>
            })
            :
        <h1 className={"font-bold text-5xl"}>loading exercises...</h1>}
            </div>
        </>
    )
}