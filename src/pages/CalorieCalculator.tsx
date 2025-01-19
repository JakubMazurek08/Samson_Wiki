import {NavBar} from "../pages/NavBar.tsx";
import { useState } from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import './CalorieCalculator.css';
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
        <div>
            <div id="Calculator">
                <h1 id="title">Calorie Calculator</h1>
                <form id="mainForm" onSubmit={handleSubmit(onSubmit)} >
                    <br />
                    <div id="form">
                        <select {...register("sex")}>
                            <option>Female</option>
                            <option>Male</option>
                        </select>
                    </div>
                    <br />
                    <div id="form">
                    <input id="weight" type="number" placeholder="weight" step="0.01" {...register("weight")} />
                    &#160;<h1>kg</h1>
                    </div><br />
                    <div id="form">
                        <input id="age" type="number" placeholder="age" {...register("age")}/>
                        &#160;<h1>years</h1>
                    </div><br />
                    <div id="form">
                        <input id="height" type="number" placeholder="height" {...register("height")}/>
                        &#160;<h1>cm</h1>
                    </div><br />
                    <div id="form">
                    <select {...register("PAL")}>
                        <option>Little to no exercise</option>
                        <option>Light exercise (1-3 days per week)</option>
                        <option>Moderate exercise (3-5 days per week)</option>
                        <option>Heavy exercise (6-7 days per week)</option>
                        <option>Very heavy exercise (twice per day)</option>
                    </select>
                    </div><br />
                    <div id="form">
                    <button type="submit">
                        Calculate
                    </button>&#160;&#160;&#160;&#160;&#160;
                    <button onClick={Reset}>Reset</button>
                    </div>
                </form>
        </div><br />
                <div id="result">
                     <h1>You have to eat {calorie} kcal</h1>
                </div>
        </div>
        
    )
}