import {Link} from "react-router-dom";
import Lottie from "lottie-react";
import Anim404Page from "../assets/animations/Anim404Page.json"


export const ErrorPage = () => {


    return (
        <div>
            <div className="flex flex-col items-center justify-center bg-secondary-medium min-h-screen">
                <div className="w-80 h-64 mb-3">
                    <Lottie animationData={Anim404Page} loop={true}  />
                </div>
                <h1 className="text-6xl text-transform: uppercase text-white text-center mb-6">Something went <br/> wrong...</h1>
                <Link to="/" className="text-2xl text-transform: uppercase text-white bg-primary-medium px-10 py-3 mt-6 rounded-md">Main Page</Link>
            </div>
            <Link to="https://www.instagram.com/sentinobln/" className="absolute bottom-4 left-4 text-secondary-medium" target="_blank">Skibidi</Link>
        </div>
    )
}