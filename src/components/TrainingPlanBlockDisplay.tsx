import {MapInteractionCSS} from "react-map-interaction"
import {ExercisePiece} from "./ExercisePiece.tsx";
import {StartPiece} from "./StartPiece.tsx";


export const TrainingPlanBlockDisplay = ({exercises}) => {
    return (
        <div className="border-2 border-secondary-medium mt-4 rounded-3xl ">
            <MapInteractionCSS
                defaultValue={{
                    scale: 1,
                    translation: {x: 350, y: 0}
                }}
                minScale={1}
                maxScale={1}
                translationBounds={{
                    xMax: 675,
                    yMax: 1000,
                    xMin: 0,
                    yMin: -1000,
                }}
            >
                <div className={"h-[600px] flex flex-col-reverse"}>
                    <StartPiece/>
                    {
                        exercises.map((exercise,index) => {
                            return <ExercisePiece name={exercise} isInStack={true} key={index+1} id={exercise+"*"+(index+1)}/>
                        })
                    }
                </div>
            </MapInteractionCSS>
        </div>
    )
}