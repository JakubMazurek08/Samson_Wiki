export const TrainingPlan = ({name}) => {
    return (
        <div className={"w-[420px] border-primary-medium border-2 rounded-2xl h-[200px]"}>
            <div className={"bg-primary-light rounded-t-[14px] h-16 text-secondary-light font-bold text-4xl flex flex-row justify-between p-2"}><h1>{name}</h1>
                <img src="/src/assets/icons/delete.png" alt=""/></div>

        </div>
    )
}