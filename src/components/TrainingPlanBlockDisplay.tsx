import {MapInteractionCSS} from "react-map-interaction"
import {ExercisePiece} from "./ExercisePiece.tsx";
import {StartPiece} from "./StartPiece.tsx";
import {useEffect} from "react";


export const TrainingPlanBlockDisplay = ({exercises, setTrainingPlan, currentDay, setSaved}) => {

    return (
        <div className="border-2 border-secondary-medium mt-4 rounded-3xl ">
            <MapInteractionCSS
                defaultValue={{
                    scale: 1,
                    translation: {x: 150, y: -50}
                }}
                minScale={1}
                maxScale={1}
                translationBounds={{
                    xMax: 330,
                    yMax: 1000,
                    xMin: 0,
                    yMin: -1000,
                }}
            >
                <div className={"h-[600px] flex flex-col-reverse"}>
                    <StartPiece isInStack={true} id={"start*0"}/>
                    {
                        exercises.map((exercise,index) => {
                            return <ExercisePiece exercise={exercise} currentDay={currentDay} setSaved={setSaved} setTrainingPlan={setTrainingPlan} isInStack={true} key={index+1} id={exercise+"*"+(index+1)}/>
                        })
                    }
                </div>
            </MapInteractionCSS>
        </div>
    )
}