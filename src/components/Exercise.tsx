import {useEffect, useState, useRef} from "react";
import {getDownloadURL, ref} from "firebase/storage";
import {storage} from "../lib/firebase.ts";
import {SmallMuscleDisplay} from "./SmallMuscleDisplay.tsx";
import LottieView from 'lottie-react';
import loadingVideoJson from "../../public/animations/loadingVideo.json"

export const Exercise = ({exerciseData}) => {
    const lottieRef = useRef();
    const [url1,setUrl1] = useState("");
    const [url2,setUrl2] = useState("");
    const [toggle, setToggle] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const videoWrapperRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (videoWrapperRef.current) {
            observer.observe(videoWrapperRef.current);
        }

        return () => {
            if (videoWrapperRef.current) {
                observer.unobserve(videoWrapperRef.current);
            }
        };
    }, []);

    useEffect(()=>{
        if (!isInView) return;
        const storageRef1 = ref(storage, `gs://samsonwiki-f8f0a.firebasestorage.app/${exerciseData.name}-1.mp4` );
        const storageRef2 = ref(storage, `gs://samsonwiki-f8f0a.firebasestorage.app/${exerciseData.name}-2.mp4` );

        getDownloadURL(storageRef1).then((url)=>{
            setUrl1(url);
        })
        getDownloadURL(storageRef2).then((url)=>{
            setUrl2(url);
        })
    },[exerciseData, isInView])

    return (
        <div ref={videoWrapperRef} className={`relative min-h-[550px] 2xl:mr-[500px]`}>
            <div className={`bg-true-white shadow-lg rounded-l-3xl ${!toggle?"rounded-r-3xl":null} transition-all duration-300 h-full`}>
                <div className={`bg-primary-light py-4 rounded-tl-3xl transition-all duration-300 ${!toggle?"rounded-tr-3xl":null} min-h-16 flex pl-8 py-2 items-center`}> <h1 className={"text-secondary-light font-bold text-4xl"}>{exerciseData.name}</h1></div>
                <div className={"flex justify-around lg:justify-between items-center mb-8"}>
                    {url1?
                        <video className="bg-white border-primary-light w-[95%] lg:w-[47.5%] aspect-video rounded-b-xl"     autoPlay loop>
                            <source src={url1} type="video/mp4" />
                        </video>
                        :
                        <LottieView className="bg-[#e1e1e1] border-primary-light w-[95%] lg:w-[47.5%] aspect-video rounded-b-xl " animationData={loadingVideoJson} lottieRef={lottieRef}/>
                    }
                    {url2?
                        <video className="bg-white border-primary-light w-[47.5%] aspect-video rounded-b-xl hidden lg:block"   autoPlay loop>
                            <source src={url2} type="video/mp4" />
                        </video>
                        :
                        <LottieView className="bg-[#e1e1e1] border-primary-light w-[47.5%] aspect-video rounded-b-xl hidden lg:block" animationData={loadingVideoJson} lottieRef={lottieRef}/>
                    }
                </div>
                <div className={`rounded-bl-3xl ${!toggle?"rounded-br-3xl":null} transition-all duration-300 px-8 pb-8 flex justify-between w-11/12`}>
                    <div className={"flex flex-col"}>
                        <div><span className={"text-primary-light font-black text-3xl"}>1.</span><span className={"ml-2 text-black text-xl"}>{exerciseData.step1}</span></div>
                        <div><span className={"text-primary-light font-black text-3xl"}>2.</span><span className={"ml-2 text-black text-xl"}>{exerciseData.step2}</span></div>
                        <div><span className={"text-primary-light font-black text-3xl"}>3.</span><span className={"ml-2 text-black text-xl"}>{exerciseData.step3}</span></div>
                    </div>
                </div>
                <div onMouseEnter={() => {
                    setToggle(true)
                }} onMouseLeave={() => {
                    setToggle(false)
                }}
                     className={"w-12 h-12 rounded-xl hidden bg-primary-medium pointer-events-auto mt-20 2xl:flex items-center justify-center absolute bottom-8 right-8"}>
                    <img className={"w-9 h-9 "} src="/icons/search.png" alt=""/></div>
            </div>
            <div className={`bg-true-white absolute right-0 top-0 h-full w-[420px] -z-10 rounded-r-3xl hidden ${toggle?"translate-x-[420px]" : null} transition-all duration-300  lg:block `}>
                <div className={`bg-primary-light rounded-tr-3xl  transition-all duration-300 ${!toggle?"rounded-tr-3xl":null} h-16 flex pl-8 items-center`}> </div>
                <div className={"flex flex-col items-center gap-4 p-4 "}>
                    <SmallMuscleDisplay primary={exerciseData.primary} secondary={exerciseData.secondary} ternary={exerciseData.ternary}/>
                    <ExerciseInfoDisplay grip={exerciseData.grip} force={exerciseData.force} difficulty={exerciseData.difficulty}/>
                </div>
            </div>
        </div>
    )
}

const ExerciseInfoDisplay = ({grip,force,difficulty}) => {
    return(
        <div className={"flex"}>
            <div className={"border-r-4 border-primary-medium p-4"}>
                <h1 className={"text-2xl font-bold text-primary-medium"}>Difficulty</h1>
                <h1 className={"text-2xl font-bold text-primary-medium"}>Force</h1>
                <h1 className={"text-2xl font-bold text-primary-medium"}>Grip</h1>
            </div>
            <div className={"border-primary-medium p-4"}>
                <h1 className={"text-2xl text-primary-medium"}>{difficulty}</h1>
                <h1 className={"text-2xl text-primary-medium"}>{force}</h1>
                <h1 className={"text-2xl text-primary-medium"}>{grip}</h1>
            </div>
        </div>
    )
}