import {ManFront} from "../components/ManFront.tsx";
import {ManBack} from "../components/ManBack.tsx";
import {EquipmentFilterDropdown} from "../components/EquipmentFilterDropdown.tsx";

export const Home = () => {
    return(
        <main className="flex  ml-20 justify-between gap-20 p-10 h-[calc(100vh-5rem)]">
            <ManFront height={800}/>
            <ManBack height={800}/>
            <EquipmentFilterDropdown/>
        </main>
    )
}
