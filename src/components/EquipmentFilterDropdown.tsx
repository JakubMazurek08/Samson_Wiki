import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useFilter} from "../contexts/useFilter.ts";

export const EquipmentFilterDropdown = ({isDropped}) => {
    const [toggle, setToggle ] = useState(false);
    const {register, handleSubmit, watch} = useForm();
    const {updateFilters, selectedFilters} = useFilter();
    const submit = (data) => {
        const filters = [];
        Object.keys(data).forEach((key) => {
            if(data[key]){
                filters.push(key);
            }
        });
        updateFilters(filters);
    }

    useEffect(() => {
        const subscription = watch(handleSubmit(submit));
        return () => subscription.unsubscribe();
    }, [handleSubmit,watch]);
    return (

        <div className={" flex-col items-center hidden md:flex"}>
            {isDropped ?
            <form className={"w-56 rounded-b-2xl bg-primary-light"}>
                <CheckBox label={"Barbell"} name={"barbell"} register={register}/>
                <CheckBox label={"Dumbbell"} name={"dumbbell"} register={register}/>
                <CheckBox label={"Machine"} name={"machine"} register={register}/>
                <CheckBox label={"Cables"} name={"cables"} register={register}/>
                <CheckBox label={"smith machine"} name={"smith machine"} register={register}/>
                <CheckBox label={"Bodyweight"} name={"bodyweight"} register={register}/>
            </form>
            :
                <>
                <button onClick={() => {
                    setToggle(prevState => !prevState)
                }}
                        className={`flex bg-primary-medium w-56 h-14 ${toggle ? "rounded-t-2xl border-secondary-light border-b-2" : "rounded-2xl"} items-center`}>
                    <span className={"text-white font-bold text-2xl ml-2"}>Filter Exercises</span>
                    <img className={`h-8 w-8 mt-2 ml-2 ${toggle ? "rotate-180" : "rotate-0"}`}
                         src="/icons/down-arrow.png" alt=""/>
                </button>
            {
                toggle ?
                <form className={"w-56 rounded-b-2xl bg-primary-light"}>
                    <CheckBox label={"Barbell"} name={"barbell"} register={register}/>
                    <CheckBox label={"Dumbbell"} name={"dumbbell"} register={register}/>
                    <CheckBox label={"Machine"} name={"machine"} register={register}/>
                    <CheckBox label={"Cables"} name={"cables"} register={register}/>
                    <CheckBox label={"smith machine"} name={"smith machine"} register={register}/>
                    <CheckBox label={"Bodyweight"} name={"bodyweight"} register={register}/>
                </form>

                :
                 null
            }
                </>
            }

        </div>
    )
}

const CheckBox = ({label, name,register})  => {
    const {selectedFilters} = useFilter();
    const isChecked = selectedFilters.includes(name);


    return(
        <div className={"px-2 my-3"}>
            <input className="text-white mr-4" defaultChecked={isChecked} type="checkbox" {...register(name)} />
            <span className={"text-white text-xl"}>{label}</span>
        </div>
    )
}