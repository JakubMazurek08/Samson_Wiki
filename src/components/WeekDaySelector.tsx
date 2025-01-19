export const WeekDaySelector = ({setSelectedDay,selectedDay}) => {
    return (
        <div>
            <h1 className={"text-2xl text-secondary-medium font-bold px-6 mt-6 mb-1"}>Day of the week:</h1>
            <div className="bg-primary-medium flex p-1 px-6 justify-between items-center rounded-full gap-5 ">
                <Day letter={"M"} number={0} selectedDay={selectedDay} setSelectedDay={setSelectedDay}></Day>
                <Day letter={"T"} number={1} selectedDay={selectedDay} setSelectedDay={setSelectedDay}></Day>
                <Day letter={"W"} number={2} selectedDay={selectedDay} setSelectedDay={setSelectedDay}></Day>
                <Day letter={"T"} number={3} selectedDay={selectedDay} setSelectedDay={setSelectedDay}></Day>
                <Day letter={"F"} number={4} selectedDay={selectedDay} setSelectedDay={setSelectedDay}></Day>
                <Day letter={"S"} number={5} selectedDay={selectedDay} setSelectedDay={setSelectedDay}></Day>
                <Day letter={"S"} number={6} selectedDay={selectedDay} setSelectedDay={setSelectedDay}></Day>
            </div>
        </div>
    )
}

const Day = ({letter,number,selectedDay, setSelectedDay}) => {
    return <button onClick={()=>{setSelectedDay(number)}} className={`text-6xl font-bold ${selectedDay==number?"text-secondary-light":"text-white"} transition-all duration-200 hover:text-secondary-light active:scale-110`}>{letter}</button>
}