export const WeekDaySelector = ({setSelectedDay,selectedDay}) => {
    return (
        <>
            <h1 className={"text-2xl text-secondary-medium font-bold px-6 mt-6 mb-1"}>Day of the week:</h1>
            <div className="bg-primary-medium flex p-1 px-6 justify-between items-center rounded-full w-4/12 ">
                <Day letter={"M"} number={0} selectedDay={selectedDay} setSelectedDay={setSelectedDay}></Day>
                <Day letter={"T"} number={1} selectedDay={selectedDay} setSelectedDay={setSelectedDay}></Day>
                <Day letter={"W"} number={2} selectedDay={selectedDay} setSelectedDay={setSelectedDay}></Day>
                <Day letter={"T"} number={3} selectedDay={selectedDay} setSelectedDay={setSelectedDay}></Day>
                <Day letter={"F"} number={4} selectedDay={selectedDay} setSelectedDay={setSelectedDay}></Day>
                <Day letter={"S"} number={5} selectedDay={selectedDay} setSelectedDay={setSelectedDay}></Day>
                <Day letter={"S"} number={6} selectedDay={selectedDay} setSelectedDay={setSelectedDay}></Day>
            </div>
        </>
    )
}

const Day = ({letter,number,selectedDay, setSelectedDay}) => {
    return <button onClick={()=>{setSelectedDay(number)}} className={`text-6xl font-bold ${selectedDay==number?"text-secondary-light":"text-white"}`}>{letter}</button>
}