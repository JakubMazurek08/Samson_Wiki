import { db } from "../lib/firebase.ts";
import { useEffect, useState, useCallback } from "react";
import { collection, query, where, and, or, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Exercise } from "../components/Exercise.tsx";
import { v4 } from "uuid";
import { useFilter } from "../contexts/useFilter.ts";
import { ManFront } from "../components/ManFront.tsx";
import { ManBack } from "../components/ManBack.tsx";
import { useForm } from "react-hook-form";

function capitalizeWords(inputString: string) {
    return inputString
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export const ExercisesByMuscle = () => {
    const { selectedFilters, updateFilters } = useFilter();
    const { muscle } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noFiltersSelected, setNoFiltersSelected] = useState(false);
    const [noResults, setNoResults] = useState(false);

    const { register, watch } = useForm({
        defaultValues: {
            barbell: false,
            dumbbell: false,
            machine: false,
            cables: false,
            "smith machine": false,
            bodyweight: false,
        },
    });

    // Debounce helper
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    // Submit handler to update filters based on checkboxes
    const submit = (formData) => {
        const filters = Object.keys(formData).filter((key) => formData[key]);
        updateFilters(filters);
    };

    // Debounced version of submit
    const debouncedSubmit = useCallback(debounce(submit, 500), [updateFilters]);

    // Watch for changes in checkbox form
    useEffect(() => {
        const subscription = watch((formData) => {
            debouncedSubmit(formData);
        });
        return () => subscription.unsubscribe();
    }, [watch, debouncedSubmit]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setNoResults(false);

            if (selectedFilters.length === 0) {
                // No filters selected: show message and clear data
                setData([]);
                setNoFiltersSelected(true);
                setLoading(false);
                return;
            }

            setNoFiltersSelected(false);

            try {
                const q = query(
                    collection(db, "exercises"),
                    and(
                        or(
                            where("primary", "==", muscle),
                            where("secondary", "==", muscle),
                            where("ternary", "==", muscle)
                        ),
                        where("equipment", "in", selectedFilters)
                    )
                );

                const querySnapshot = await getDocs(q);

                const fetchedData = [];
                querySnapshot.forEach((doc) => fetchedData.push(doc.data()));

                // Split by primary, secondary, ternary muscle match for ordering (optional)
                const primaryData = fetchedData.filter((e) => e.primary === muscle);
                const secondaryData = fetchedData.filter((e) => e.secondary === muscle);
                const ternaryData = fetchedData.filter((e) => e.ternary === muscle);

                const combinedData = [...primaryData, ...secondaryData, ...ternaryData];

                if (combinedData.length === 0) {
                    setNoResults(true);
                } else {
                    setNoResults(false);
                }

                setData(combinedData);
            } catch (error) {
                console.error("Error fetching exercises:", error);
                setNoResults(true);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [muscle, selectedFilters]);

    return (
        <main className="flex flex-col lg:items-start bg-white items-center">
            <div className="w-96 2xl:fixed 2xl:right-32 2xl:top-24 2xl:z-10 lg:ml-20">
                <h1 className="text-7xl text-primary-medium font-bold font-playfair">
                    {muscle === "lower-back"
                        ? "Lower back"
                        : muscle === "upper-back"
                            ? "Upper back"
                            : capitalizeWords(muscle)}
                </h1>
                <div className="w-96 min-h-80 bg-primary-light rounded-[16px] mt-2 border-primary-light shadow-lg border-8">
                    <div className="w-full min-h-40 bg-true-white rounded-xl flex p-2 justify-around">
                        <ManFront primary={muscle} height={290} />
                        <ManBack primary={muscle} height={290} />
                    </div>
                    <form className="bg-primary-light rounded-xl pt-10">
                        <div className="flex justify-between relative">
                            <CheckBox label="Barbell" name="barbell" register={register} />
                            <CheckBox label="Dumbbell" name="dumbbell" register={register} />
                        </div>
                        <div className="flex justify-between relative">
                            <CheckBox label="Machine" name="machine" register={register} />
                            <CheckBox label="Cables" name="cables" register={register} />
                        </div>
                        <div className="flex justify-between relative">
                            <CheckBox label="Smith machine" name="smith machine" register={register} />
                            <CheckBox label="Bodyweight" name="bodyweight" register={register} />
                        </div>
                    </form>
                </div>
            </div>

            <main className="flex p-8  w-screen pointer-events-none gap-8">
                <div className="flex-1  flex flex-col gap-8 z-20">
                    {loading &&
                        <div className={`relative min-h-[600px] 2xl:mr-[500px]`}>
                            <div className={`bg-true-white shadow-lg rounded-3xl h-full flex justify-center items-center`}>
                            </div>
                        </div>
                    }

                    {!loading && noFiltersSelected && (
                        <div className={`relative min-h-[600px] 2xl:mr-[500px]`}>
                            <div className={`bg-true-white shadow-lg rounded-3xl h-full flex justify-center items-center`}>
                                <h1 className="font-bold text-5xl">Please select at least one equipment filter.</h1>
                            </div>
                        </div>
                    )}

                    {!loading && noResults && !noFiltersSelected && (
                        <div className={`relative min-h-[600px] 2xl:mr-[500px]`}>
                            <div className={`bg-true-white shadow-lg rounded-3xl h-full flex justify-center items-center`}>
                                <h1 className="font-bold text-5xl">No exercises found for the selected filters.</h1>
                            </div>
                        </div>
                    )}

                    {!loading && !noResults && !noFiltersSelected && data.length > 0 &&
                        data.map((exercise) => <Exercise exerciseData={exercise} key={v4()} />)}
                </div>
            </main>
        </main>
    );
};

const CheckBox = ({ label, name, register }) => {
    const { selectedFilters } = useFilter();
    const isChecked = selectedFilters.includes(name);

    return (
        <div className="px-2 my-3 flex w-1/2">
            <input
                className="w-4 h-4 ml-2 mr-3 mt-2 bg-white rounded-md transition-all duration-300 ease-in-out cursor-pointer checked:bg-blue-500 checked:scale-125"
                type="checkbox"
                defaultChecked={isChecked}
                {...register(name)}
            />
            <span className="text-white text-xl">{label}</span>
        </div>
    );
};
