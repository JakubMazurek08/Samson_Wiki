import {useEffect, useState, useRef} from "react";
import {getDownloadURL, ref} from "firebase/storage";
import {db, storage} from "../lib/firebase.ts";
import {SmallMuscleDisplay} from "./SmallMuscleDisplay.tsx";
import LottieView from 'lottie-react';
import loadingVideoJson from "../../public/animations/loadingVideo.json"
import { collection, getDocs,  query} from "firebase/firestore";

export const WorkoutExercise = ({currentExerciseName}) => {
    const lottieRef = useRef();
    const [url1,setUrl1] = useState("");
    const [url2,setUrl2] = useState("");
    const [toggle, setToggle] = useState(false);
    const videoWrapperRef = useRef(null);
    const [exerciseData, setExerciseData] = useState(null);

    useEffect(()=>{
        const getData = async () => {
            const q = query(collection(db,"exercises"))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if(doc.data().name==currentExerciseName){
                    setExerciseData(doc.data());
                    const storageRef1 = ref(storage, `gs://samsonwiki-f8f0a.firebasestorage.app/${doc.data().name}-1.mp4` );
                    const storageRef2 = ref(storage, `gs://samsonwiki-f8f0a.firebasestorage.app/${doc.data().name}-2.mp4` );

                    getDownloadURL(storageRef1).then((url)=>{
                        setUrl1(url);
                    })
                    getDownloadURL(storageRef2).then((url)=>{
                        setUrl2(url);
                    });
                }
            });
        }
      getData();
    },[currentExerciseName])

    useEffect(() => {
        console.log(url1,url2);
    }, [url1,url2]);


    return (
        <>
            {
                exerciseData?
                    <div className={"flex w-[90%] h-[545px] shadow-lg bg-true-white shadow- mt-4 rounded-3xl"}>
                        <div ref={videoWrapperRef}
                             className={`relative w-full xl:w-2/3`}>
                            <div
                                className={`rounded-l-3xl transition-all duration-300`}>
                                <div className={"flex justify-around lg:justify-between mt-4 ml-4 items-center mb-8"}>
                                    {url1 ?
                                        <video
                                            key={url1}
                                            className="bg-white border-primary-light w-[95%] lg:w-[47.5%] aspect-video rounded-xl"
                                            autoPlay loop>
                                            <source src={url1} type="video/mp4"/>
                                        </video>
                                        :
                                        <LottieView
                                            className="bg-[#e1e1e1] border-primary-light w-[95%] lg:w-[47.5%] aspect-video rounded-xl "
                                            animationData={loadingVideoJson} lottieRef={lottieRef}/>
                                    }
                                    {url2 ?
                                        <video
                                            key={url2}
                                            className="bg-white border-primary-light w-[47.5%] aspect-video rounded-xl hidden lg:block"
                                            autoPlay loop>
                                            <source src={url2} type="video/mp4"/>
                                        </video>
                                        :
                                        <LottieView
                                            className="bg-[#e1e1e1] border-primary-light w-[47.5%] aspect-video rounded-xl hidden lg:block"
                                            animationData={loadingVideoJson} lottieRef={lottieRef}/>
                                    }
                                </div>
                                <div
                                    className={`rounded-bl-3xl ${!toggle ? "rounded-br-3xl" : null} transition-all duration-300 px-8 pb-8 flex justify-between w-11/12`}>
                                    <div className={"flex flex-col"}>
                                        <div><span className={"text-primary-light font-black text-3xl"}>1.</span><span
                                            className={"ml-2 text-black text-xl"}>{exerciseData.step1}</span></div>
                                        <div><span className={"text-primary-light font-black text-3xl"}>2.</span><span
                                            className={"ml-2 text-black text-xl"}>{exerciseData.step2}</span></div>
                                        <div><span className={"text-primary-light font-black text-3xl"}>3.</span><span
                                            className={"ml-2 text-black text-xl"}>{exerciseData.step3}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={` h-full w-[420px] hidden xl:block rounded-r-3xl`}>
                            <div className={"flex flex-col items-center gap-4 p-4 "}>
                                <SmallMuscleDisplay primary={exerciseData.primary} secondary={exerciseData.secondary}
                                                    ternary={exerciseData.ternary}/>
                                <ExerciseInfoDisplay grip={exerciseData.grip} force={exerciseData.force}
                                                     difficulty={exerciseData.difficulty}/>
                            </div>
                        </div>
                    </div>
                    :
                    null}
        </>
    )
}

const ExerciseInfoDisplay = ({grip, force, difficulty}) => {
    return (
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