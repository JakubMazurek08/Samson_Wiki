export const ProgressBar = ({totalExercisesNumber, currentExerciseNumber, name, day}) => {
    const barProgress = Math.ceil(currentExerciseNumber/(totalExercisesNumber-1)*100);
    let progressBarText;
    if(currentExerciseNumber+1>totalExercisesNumber-1){
        progressBarText = `${totalExercisesNumber-1}/${totalExercisesNumber-1}`;
    }else{
        progressBarText = `${currentExerciseNumber+1}/${totalExercisesNumber-1}`;
    }
    return(
        <div className={"w-full"}>
            <div className={"w-full flex justify-between"}>
                <h1 className={"text-primary-medium font-bold"}>{name} - {day}</h1>
                <h1 className={"text-primary-medium font-bold"}>{progressBarText}</h1>
            </div>
            <div className={"w-full border-primary-medium border-2 rounded-full h-4 relative"}>
                <div
                    style={{ width: `${barProgress}%` }}
                    className={`absolute top-0 left-0 bg-secondary-light rounded-full h-[12px] transition-all duration-1000`}></div>
            </div>

        </div>
    )
}