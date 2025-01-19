import {useState} from "react";
import {useForm} from "react-hook-form";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {setDoc,doc, collection} from "firebase/firestore";
import {auth, db} from "../lib/firebase.ts";

export const LoginPopup = ({setIsLoggingIn}) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [errorLoggingIn, setErrorLogginIn] = useState(false);



    const addUser = async (id, username) => {
        try {
            const userCollectionRef = collection(db, "users");
            await setDoc(doc(userCollectionRef, id), {
                username: username,
                creationDate: `${new Date().getDate().toString()}-${(new Date().getMonth()+1).toString()}-${(new Date().getFullYear()).toString()}`,
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const onsubmit = ({email,password,username})=> {
        if (!isRegistering) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log("success logging in!", user)
                    setIsLoggingIn(false);
                    // ...
                })
                .catch((error) => {
                    console.log(error.code);
                    console.log(error.message);
                    setErrorLogginIn(true);
                });
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    console.log("success registering!", user)
                    addUser(user.uid, username);
                    setIsLoggingIn(false);
                    // ...
                })
                .catch((error) => {
                    console.log(error.code);
                    console.log(error.message);
                });
        }
    }

    return (
        <>
            <div onClick={()=>{setIsLoggingIn(false)}} className={"w-full h-full fixed"}></div>
            <div className={"bg-white h-3/4 w-[425px] lg:w-[475px] rounded-3xl flex flex-col items-center p-4 z-50"}>
                <img className="h-60" src="/src/assets/logo/SamsonWikiLogoLight.png" alt=""/>
                <h1 className={"text-6xl text-primary-light font-bold -mt-10"}>{isRegistering?"Sign in":"Log in"}</h1>
                <button onClick={()=>{setIsRegistering((prevState) => !prevState)}} className={"mt-3"}>Or <span className={"text-primary-light"}>{isRegistering?"Log in":"Create Account"}</span></button>
                <form className={"w-10/12 mt-10 flex flex-col items-center"} onSubmit={handleSubmit(onsubmit)}>
                    {errorLoggingIn ?
                        <h1 className={"text-secondary-medium text-start"}>Wrong email or password</h1> : null}
                    <div className={"flex flex-col w-full"}>
                        <label className={"text-primary-medium"}>E-mail</label>
                        <input {...register("email", {
                            required: true
                        })} className={`mt-1 p-2 ${errors.email?.message ? "border-red-transparent" : "border-primary-light"} border-2 rounded-md`}
                               placeholder={"Type here..."}/>
                    </div>
                    <div className={"flex flex-col w-full"}>
                        <label className={"text-primary-medium"}>Password</label>
                        <input {...register("password", {required: true})}
                               className={`mt-1 p-2 ${errors.password?.message ? "border-red-transparent" : "border-primary-light"} border-2 rounded-md`}
                               placeholder={"Type here..."}/>
                    </div>
                    {isRegistering ?
                    <div className={"flex flex-col w-full"}>
                        <label className={"text-primary-medium"}>Username</label>
                        <input {...register("username", {required: true})}
                               className={`mt-1 p-2 ${errors.username?.message ? "border-red-transparent" : "border-primary-light"} border-2 rounded-md`}
                               placeholder={"Type here..."}/>
                    </div>
                    :null}
                    <button type={"submit"}
                            className={`w-40 bg-primary-light rounded-md text-white font-bold text-3xl h-12 ${isRegistering?"mt-10":"mt-20"} hover:bg-primary-medium transition-transform duration-300 hover:scale-110`}>{isRegistering ? "Register" : "Log in"}</button>
                </form>
            </div>
        </>
    )
}