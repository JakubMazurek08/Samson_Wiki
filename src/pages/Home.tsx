import {ManFront} from "../components/ManFront.tsx";
import {ManBack} from "../components/ManBack.tsx";
import {storage} from "../lib/firebase.ts";
import {ref, getDownloadURL} from "firebase/storage"
import {useEffect, useState} from "react";
import {EquipmentFilterDropdown} from "../components/EquipmentFilterDropdown.tsx";

export const Home = () => {
    return(
        <main className="flex gap-20 p-10 h-[calc(100vh-5rem)]">
            <ManFront/>
            <ManBack/>
            <EquipmentFilterDropdown/>
        </main>
    )
}
