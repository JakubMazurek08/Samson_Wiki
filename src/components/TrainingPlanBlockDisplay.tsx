import {MapInteractionCSS} from "react-map-interaction"
import {ExercisePiece} from "./ExercisePiece.tsx";
import {StartPiece} from "./StartPiece.tsx";

export const TrainingPlanBlockDisplay = () => {
    return (
        <div className="border-2 border-secondary-medium mt-4 rounded-3xl ">
        <MapInteractionCSS
            defaultValue={{
                scale: 0.5,
                translation: { x: 150, y: 450 }
            }}
            minScale={0.5}
            maxScale={1}
            translationBounds={{
                xMax: 950,
                yMax: 1000,
                xMin: 0,
                yMin: -1000,
            }}
        >
            <div className={"h-[600px]"}>
                <StartPiece/>
            </div>
        </MapInteractionCSS>
        </div>
    )
}