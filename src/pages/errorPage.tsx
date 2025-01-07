import {Link} from "react-router-dom";

export const ErrorPage = () => {

    return (
        <div>
            <div className="flex flex-col items-center justify-center bg-primary-light min-h-screen">
                <h1 className="text-6xl text-transform: uppercase text-white">Something went wrong...</h1>
                <Link to="/" className="text-2xl text-transform: uppercase text-white bg-primary-medium px-10 py-3 mt-4 rounded-md">Main Page</Link>
            </div>
            <Link to="https://www.instagram.com/sentinobln/" className="absolute bottom-4 left-4  text-primary-light" target="_blank">Skibidi</Link>
        </div>
    )
}