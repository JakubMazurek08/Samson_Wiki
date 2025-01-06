import {ManFront} from "../components/ManFront.tsx";
import {ManBack} from "../components/ManBack.tsx";
import {storage} from "../lib/firebase.ts";
import {ref, getDownloadURL} from "firebase/storage"
import {useEffect, useState} from "react";

export const Home = () => {

    const [url,setUrl] = useState("");
    useEffect(()=>{
        const storageRef = ref(storage, 'gs://samsonwiki-f8f0a.firebasestorage.app/IMG_3376.mp4' );

        getDownloadURL(storageRef).then((url)=>{
            console.log(url);
            setUrl(url);
        })
    },[])
    return(
        <main className="flex gap-20 p-10 h-[calc(100vh-5rem)]">
            <ManFront/>
            <ManBack/>
        </main>
    )
}
// {/*{url?*/}
// {/*    <video width="300" height="300"  autoPlay loop>*/}
// {/*        <source src={url} type="video/mp4" />*/}
// {/*    </video>*/}
// {/*:null}*/}