import {ManFront} from "../components/ManFront.tsx";
import {ManBack} from "../components/ManBack.tsx";
import {EquipmentFilterDropdown} from "../components/EquipmentFilterDropdown.tsx";

export const Home = () => {
    return(
        <main className="flex gap-20 justify-center bg-true-white p-10 h-[calc(100vh-5rem)]">
            <div className="w-[1000px] h-[1600px] 2xl:h-[800px] flex flex-col 2xl:flex-row gap-20 ">
            <ManFront height={800}/>
            <ManBack height={800}/>
            </div>
            <EquipmentFilterDropdown/>
        </main>
    )
}
