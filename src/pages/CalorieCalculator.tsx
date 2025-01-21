import {NavBar} from "../pages/NavBar.tsx";
import { useState } from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import { count } from "firebase/firestore";

type Data = {
    sex: string;
    weight: number;
    age: number;
    height: number;
    PAL: string;
}

export const CalorieCalculator = () => {
    const {register, handleSubmit} = useForm<FormData>({mode: "onBlur"});
    const [calorie, setCounter] = useState(0);
    const Reset = () => {
        location.reload();
    }
    const onSubmit:SubmitHandler<FormData> = (data) => {
        if(data.height == 0 || data.weight == 0 || data.age == 0){
            const calorie = setCounter(0)
        }
        else if(data.PAL == "Little to no exercise" && data.sex == "Female"){
            const calorie = setCounter(Math.ceil((data.weight * 10 + 6.25 * data.height + 5 * data.age - 161) * 1.2));
        }
        else if(data.PAL == "Little to no exercise" && data.sex == "Male"){
            const calorie = setCounter(Math.ceil((10 * data.weight + 6.25 * data.height + 5 * data.age + 5) * 1.2))        
        } 
        else if(data.PAL == "Light exercise (1-3 days per week)" && data.sex == "Female"){
            const calorie = setCounter(Math.ceil((data.weight * 10 + 6.25 * data.height + 5 * data.age - 161) * 1.375));
        }

        else if(data.PAL == "Light exercise (1-3 days per week)" && data.sex == "Male"){
            const calorie = setCounter(Math.ceil((10 * data.weight + 6.25 * data.height + 5 * data.age + 5) * 1.375));
        }
        else if(data.PAL == "Moderate exercise (3-5 days per week)" && data.sex == "Female"){
            const calorie = setCounter(Math.ceil((data.weight * 10 + 6.25 * data.height + 5 * data.age - 161) * 1.55));
        }
        else if(data.PAL == "Moderate exercise (3-5 days per week)" && data.sex == "Male"){
            const calorie = setCounter(Math.ceil((10 * data.weight + 6.25 * data.height + 5 * data.age + 5) * 1.55));
        }
        else if(data.PAL == "Heavy exercise (6-7 days per week)" && data.sex == "Female"){
            const calorie = setCounter(Math.ceil(((data.weight * 10) + (6.25 * data.height) + (5 * data.age) - 161) * 1.725));
        }
        else if(data.PAL == "Heavy exercise (6-7 days per week)" && data.sex == "Male"){
            const calorie = setCounter(Math.ceil(((10 * data.weight) + (6.25 * data.height) + (5 * data.age) + 5) * 1.725));
        }
        else if(data.PAL == "Very heavy exercise (twice per day)" && data.sex == "Female"){
            const calorie = setCounter(Math.ceil(((data.weight * 10) + (6.25 * data.height) + (5 * data.age) - 161) * 1.9));
        }
        else if(data.PAL == "Very heavy exercise (twice per day)" && data.sex == "Male"){
            const calorie = setCounter(Math.ceil(((10 * data.weight) + (6,25 * data.height) + (5 * data.age) + 5) * 1.9));
        }
    }

    return (
            <div className="w-full flex flex-col items-center bg-white h-[calc(100vh-5rem)]">
                <h1 className={"text-primary-medium font-bold text-6xl mt-20 mb-10"}>Calorie Calculator</h1>
                <form className={"bg-true-white shadow-lg w-[400px] lg:w-[500px] p-4 flex flex-col gap-4 rounded-3xl"} onSubmit={handleSubmit(onSubmit)}>
                    <div className={"flex flex-col w-full"} id="form">
                        <label className={"text-primary-medium"}>Gender</label>
                        <select className={`mt-1 p-2 border-primary-light border-2 rounded-md`} {...register("sex")}>
                            <option>Female</option>
                            <option>Male</option>
                        </select>
                    </div>
                    <div className={"flex flex-col w-full"} id="form">
                        <label className={"text-primary-medium"}>Weight [kg]</label>
                        <input className={`mt-1 p-2 border-primary-light border-2 rounded-md`} id="weight" type="number" placeholder="type here..." step="0.01" {...register("weight")} />
                    </div>
                    <div className={"flex flex-col w-full"} id="form">
                        <label className={"text-primary-medium"}>Age [years]</label>
                        <input className={`mt-1 p-2 border-primary-light border-2 rounded-md`} id="age" type="number" placeholder="type here..." {...register("age")}/>
                    </div>
                    <div className={"flex flex-col w-full"} id="form">
                        <label className={"text-primary-medium"}>Height [cm]</label>
                        <input className={`mt-1 p-2 border-primary-light border-2 rounded-md`} id="height" type="number" placeholder="type here..." {...register("height")}/>
                    </div>
                    <div className={"flex flex-col w-full"} id="form">
                        <label className={"text-primary-medium"}>How often do you exercise?</label>
                        <select className={`mt-1 p-2 border-primary-light border-2 rounded-md`} {...register("PAL")}>
                            <option>Little to no exercise</option>
                            <option>Light exercise (1-3 days per week)</option>
                            <option>Moderate exercise (3-5 days per week)</option>
                            <option>Heavy exercise (6-7 days per week)</option>
                            <option>Very heavy exercise (twice per day)</option>
                        </select>
                    </div>
                    <div className={"flex w-full justify-around"}>
                    <button className={`w-32 bg-primary-light rounded-md text-white font-bold text-xl h-12 hover:bg-primary-medium transition-transform duration-300 hover:scale-110`} type="submit">
                            Calculate
                        </button>
                        <button  className={`w-32 bg-primary-light rounded-md text-white font-bold text-xl h-12 hover:bg-primary-medium transition-transform duration-300 hover:scale-110`} onClick={Reset}>Reset</button>
                    </div>
                </form>
                <div id="result">
                    <h1 className={"font-bold text-3xl text-primary-medium m-4"}>You have to eat {calorie} kcal</h1>
                </div>
            </div>


    )
}