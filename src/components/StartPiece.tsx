import {Hitbox} from "./Hitbox.tsx";

export const StartPiece = ({isInStack,id}) => {

    return (
        <>
        <div className={"relative -mt-1 "}>
            <svg className={"fill-secondary-light"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550 125"
                 height={125}>
                <rect className="cls-1" x="326.35" y="0" width="91.59" height="18.59" rx="8.28" ry="8.28"/>
                <rect className="cls-1" x="0" y="11.06" width="550" height="113.94" rx="14.78" ry="14.78"/>
            </svg>
            <div className={"absolute w-full h-full flex items-end p-2 top-0 left-0"}>
                <h1 className={"text-primary-medium text-8xl font-bold"}>Start</h1>
            </div>
            {isInStack ? <Hitbox id={id}/>:null}
        </div>
        </>
    )
}