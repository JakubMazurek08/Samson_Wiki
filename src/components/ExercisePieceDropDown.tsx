import {ExercisePiece} from "./ExercisePiece.tsx";
import {useEffect, useState} from "react";
import {and, collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../lib/firebase.ts";
import {useFilter} from "../contexts/useFilter.ts";

export const ExercisePieceDropDown = ({muscle}) => {

    const [data,setData] = useState([]);
    const {selectedFilters} = useFilter();

    useEffect(() => {
        const getData = async () => {
            const q = query(collection(db,"exercises"),and(where("primary","==",muscle),where("equipment","in",selectedFilters)))
            const querySnapshot = await getDocs(q);
            const newData = [];
            let newnewData = [];
            querySnapshot.forEach((doc) => {
                newData.push(doc.data());
                const primaryMuscleData = newData.filter((data)=>(data.primary == muscle));
                const secondaryMuscleData = newData.filter((data)=>(data.secondary == muscle));
                const ternaryMuscleData = newData.filter((data)=>(data.ternary == muscle));
                newnewData = [...primaryMuscleData,...secondaryMuscleData,...ternaryMuscleData];
            });
            setData(newnewData);
        }
        getData();
    }, [muscle, selectedFilters]);
    return(
        <div className={" overflow-y-auto overflow-x-hidden flex mb-2 border-b-4 flex-1 border-secondary-medium flex-col gap-2"}>
            {data?
                data.map((exercise)=>{
                    return <ExercisePiece name={exercise.name} id={exercise.name} isInStack={false}/>
                })
            : <h1>loading...</h1>}
        </div>
    )
}