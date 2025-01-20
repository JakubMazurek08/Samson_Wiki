import {ExercisePiece} from "./ExercisePiece.tsx";
import {useEffect, useState} from "react";
import {and, collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../lib/firebase.ts";
import {useFilter} from "../contexts/useFilter.ts";

export const ExercisePieceList = ({muscle}) => {

    const [data,setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil((data?.length || 0) / 3);
    const {selectedFilters} = useFilter();

    const startIndex = (currentPage - 1) * 3;
    const currentExercises = data?.slice(startIndex, startIndex + 3) || [];

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

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
    return (

        <div
            className={`items-center flex mb-5 flex-col gap-2`}
        >
            <div className="flex gap-4">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage == 1}
                    className={`px-4 py-2 font-bold bg-primary-light text-white rounded disabled:opacity-50`}
                >
                    Previous
                </button>
                <span className="text-primary-dark font-bold text-3xl">
          Page {currentPage} of {totalPages}
        </span>
                <button
                    onClick={goToNextPage}
                    disabled={currentPage == totalPages}
                    className={`px-4 py-2 font-bold bg-primary-light text-white rounded disabled:opacity-50`}
                >
                    Next
                </button>
            </div>

            {data ? (
                currentExercises.map((exercise, index) => (
                    <ExercisePiece
                        key={exercise.name}
                        exercise={exercise}
                        id={exercise.name}
                        index={index}
                        isInStack={false}
                    />
                ))

            ) : (
                <h1>loading...</h1>
            )}

        </div>
    )
}