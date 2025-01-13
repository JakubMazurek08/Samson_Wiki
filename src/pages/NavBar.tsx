import {Outlet, Link} from "react-router-dom";
import {auth} from "../lib/firebase.ts";
import {useState} from "react";

export const NavBar = () => {
    const [toggleLoginOptions, setToggleLoginOptions] = useState(false);
    return (
        <>
            <aside className="flex flex-col w-80 h-screen bg-primary-medium fixed transition-all duration-300 -translate-x-80 lg:translate-x-0">
                <NavButton label="Training Plans" icon="/src/assets/icons/planning.png" isSmall={false}/>
                <NavButton label="ExercisesByMuscle" icon="/src/assets/icons/dumbbell.png" isSmall={false}/>
                <div className="flex flex-col p-2 pl-4 py-4 border-b-4 border-secondary-light">
                    <div className="flex items-center gap-4">
                        <img className="w-12 h-12 " src={"/src/assets/icons/wrench.png"} alt="icon"/>
                        <h1 className="text-white font-bold text-2xl">Tools</h1>
                        <img className="w-8 h-8 ml-12" src={"/src/assets/icons/down-arrow.png"} alt="arrow"/>
                    </div>
                    <NavButton label="Calorie Calculator" isSmall={true}/>
                    <NavButton label="1 Rep Max Calculator" isSmall={true}/>
                </div>
            </aside>
            <header className="h-20  w-screen  bg-primary-dark fixed z-50
              flex items-center justify-between">
                <Link to="/"><img className="h-20 ml-10" src="/src/assets/logo/SamsonWikiLogoDarkFull.png" alt="SamsonWiki"/></Link>
                <img onClick={()=>{setToggleLoginOptions((prevState)=>!prevState)}} className="h-16 w-16 mr-10 bg-secondary-light rounded-full" src="/src/assets/icons/user(1).png" alt=""/>
                {toggleLoginOptions?
                    <div className={'border-primary-light border-2 rounded-md bg-true-white w-20 absolute right-20 top-10'}>
                        <button className={"p-2"}>
                        login
                        </button>
                        <button className={"p-2"}>
                        register
                        </button>
                    </div>
                :null}
            </header>

            <main className="pt-20 lg:ml-80">
                <Outlet/>
            </main>
        </>
    )
}

const NavButton = ({label, linkTo, icon, isSmall}) => {
    return(
        <Link to={linkTo} className={`${isSmall?"justify-end":""} flex items-center gap-4 p-2 pl-4 py-4 border-b-4 border-secondary-light transition-all duration-300 hover:border-primary-light group`}>
            {!isSmall ? <img className="w-12 h-12 " src={icon} alt="icon"/> : null}
            <h1 className="text-white font-bold text-2xl group-hover:rotate-2 group-hover:scale-110 transition-all duration-300">{label}</h1>
        </Link>
    )
}