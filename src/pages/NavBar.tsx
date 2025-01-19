import {Outlet, Link} from "react-router-dom";
import {auth} from "../lib/firebase.ts";
import {useEffect, useState} from "react";
import {LoginPopup} from "../components/LoginPopup.tsx";
import {useParams} from "react-router-dom";

import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";

export const NavBar = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [signedIn, setSignedIn] = useState(false);
    const [toggleLoginOptions, setToggleLoginOptions] = useState(false);

    const {planId} = useParams();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log("logged in as: ", uid);
                setSignedIn(true);
            } else {
                setSignedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            {!planId ?
                <aside
                    className="flex flex-col w-80 h-screen bg-primary-medium fixed transition-all duration-300 mt-20 -translate-x-80 lg:translate-x-0">
                    <NavButton label="Training Plans" icon="/src/assets/icons/planning.png" isSmall={false}
                               linkTo={"/plans"}/>
                    <NavButton label="ExercisesByMuscle" icon="/src/assets/icons/dumbbell.png" isSmall={false}/>
                    <div className="flex flex-col p-2 pl-4 py-4 ">
                        <div className="flex items-center gap-4">
                            <img className="w-12 h-12 " src={"/src/assets/icons/wrench.png"} alt="icon"/>
                            <h1 className="text-white font-bold text-2xl">Tools</h1>
                            <img className="w-8 h-8 ml-12" src={"/src/assets/icons/down-arrow.png"} alt="arrow"/>
                        </div>
                        <NavButton label="Calorie Calculator" isSmall={true}/>
                        <NavButton label="1 Rep Max Calculator" isSmall={true} linkTo={"/OneRep"}/>
                    </div>
                    <NavButton label="Calorie Calculator" isSmall={true} linkTo={"/CalorieCalculator"}/>
                    <NavButton label="1 Rep Max Calculator" isSmall={true}/>
                </div>
            </aside>
            : null}
            <header className="h-20  w-screen  bg-primary-dark fixed z-40
              flex items-center justify-between">
                <Link to="/"><img className="h-20 ml-10" src="/src/assets/logo/SamsonWikiLogoDarkFull.png"
                                  alt="SamsonWiki"/></Link>
                {signedIn ?
                    <div className="relative">
                        <img
                            onClick={() => {
                                setToggleLoginOptions((prevState) => !prevState)
                            }}
                            className="h-16 w-16 mr-10 bg-secondary-light rounded-full cursor-pointer"
                            src={'/src/assets/icons/user(1).png'}
                            alt="User Icon"
                        />
                        {toggleLoginOptions && (
                            <div
                                className="border-primary-light border-2 rounded-md bg-true-white w-20 absolute right-20 top-10">
                                <button className="p-2" onClick={() => {setToggleLoginOptions(false);signOut(auth)}}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    :
                    <button onClick={()=>{setIsLoggingIn(true)}} className="mr-10 text-white font-bold p-2 w-20 bg-primary-medium rounded-full hover:scale-110 transition-all duration-300 border-2 border-secondary-light">Login</button>
                }
            </header>

            <main className={`pt-20 ${!planId?"lg:ml-80":null}`}>
                <Outlet/>
            </main>

            {isLoggingIn ?
                <main className={"fixed h-screen top-0 left-0 w-screen flex items-center justify-center bg-primary-transparent z-40"}>
                   <LoginPopup setIsLoggingIn={setIsLoggingIn}/>
                </main>
            :null}
        </>
    )
}

const NavButton = ({label, linkTo, icon, isSmall}) => {
    return(
        <Link to={linkTo} className={`${isSmall?"justify-end":""} flex items-center gap-4 p-2 pl-4 py-4 border-b-2 border-secondary-light transition-all duration-300 hover:border-primary-light group`}>
            {!isSmall ? <img className="w-12 h-12 " src={icon} alt="icon"/> : null}
            <h1 className="text-white font-bold text-2xl group-hover:rotate-2 group-hover:scale-110 transition-all duration-300">{label}</h1>
        </Link>
    )
}

