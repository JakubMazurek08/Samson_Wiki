import {useEffect, useState} from "react";
import {getDownloadURL, ref} from "firebase/storage";
import {storage} from "../lib/firebase.ts";
import {SmallMuscleDisplay} from "../components/SmallMuscleDisplay.tsx";

export const Exercise = ({exerciseData}) => {
    const [url1,setUrl1] = useState("");
    const [url2,setUrl2] = useState("");
    const [toggle, setToggle] = useState(false);

    function capitalizeWords(inputString) {
        return inputString
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    useEffect(()=>{
        const storageRef1 = ref(storage, `gs://samsonwiki-f8f0a.firebasestorage.app/${exerciseData.video1}.mp4` );
        const storageRef2 = ref(storage, `gs://samsonwiki-f8f0a.firebasestorage.app/${exerciseData.video2}.mp4` );

        getDownloadURL(storageRef1).then((url)=>{
            setUrl1(url);
        })
        getDownloadURL(storageRef2).then((url)=>{
            setUrl2(url);
        })
    },[exerciseData])


    return (
        <div className={`relative h-[550px]`}>
            <div className={`bg-white rounded-l-3xl ${!toggle?"rounded-r-3xl":null} transition-all duration-300 h-full`}>
                <div className={`bg-primary-light rounded-tl-3xl transition-all duration-300 ${!toggle?"rounded-tr-3xl":null} h-16 flex pl-8 items-center`}> <h1 className={"text-secondary-light font-bold text-4xl"}>{capitalizeWords(exerciseData.name)}</h1></div>
                <div className={"flex justify-between mb-8"}>
                    {url1?
                        <video className="bg-white border-primary-light w-[47.5%] aspect-video rounded-b-xl"     autoPlay loop>
                            <source src={url1} type="video/mp4" />
                        </video>
                    :<div className="bg-[#e1e1e1] border-primary-light w-[47.5%] aspect-video rounded-b-xl flex justify-center pt-16">
                            loading video...
                        </div>}
                    {url2?
                        <video className="bg-white border-primary-light w-[47.5%] aspect-video rounded-b-xl"   autoPlay loop>
                            <source src={url2} type="video/mp4" />
                        </video>
                        :<div className="bg-[#e1e1e1] border-primary-light w-[47.5%] aspect-video rounded-b-xl flex justify-center pt-16">
                            loading video...
                        </div>}
                </div>
                <div className={`rounded-bl-3xl ${!toggle?"rounded-br-3xl":null} transition-all duration-300 px-8 pb-8 flex justify-between w-11/12`}>
                    <div className={"flex flex-col"}>
                        <div><span className={"text-primary-light font-black text-3xl"}>1.</span><span className={"ml-2 text-black text-xl"}>{exerciseData.step1}</span></div>
                        <div><span className={"text-primary-light font-black text-3xl"}>2.</span><span className={"ml-2 text-black text-xl"}>{exerciseData.step2}</span></div>
                        <div><span className={"text-primary-light font-black text-3xl"}>3.</span><span className={"ml-2 text-black text-xl"}>{exerciseData.step3}</span></div>
                    </div>
                </div>
                <div onMouseEnter={()=>{setToggle(true)}} onMouseLeave={()=>{setToggle(false)}} className={"w-12 h-12 rounded-xl bg-primary-medium mt-20 flex items-center justify-center absolute bottom-8 right-8"}><img className={"w-9 h-9 "} src="/src/assets/icons/search.png" alt=""/></div>
            </div>
            <div className={`bg-white absolute right-0 top-0 h-full w-96 -z-10 rounded-r-3xl ${toggle?"translate-x-96" : null} transition-all duration-300 `}>
                <div className={`bg-primary-light rounded-tr-3xl transition-all duration-300 ${!toggle?"rounded-tr-3xl":null} h-16 flex pl-8 items-center`}> </div>
                <div className={"flex flex-col p-4 "}>
                 <SmallMuscleDisplay primary={exerciseData.primary} secondary={exerciseData.secondary} ternary={exerciseData.ternary}/>
                </div>
            </div>
        </div>
    )
}