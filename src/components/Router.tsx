import {createBrowserRouter,RouterProvider} from "react-router-dom";
import {Home} from "../pages/Home.tsx";
import {NavBar} from "../pages/NavBar.tsx";
import {OneRepPage} from "../pages/OneRepPage.tsx"

const router = createBrowserRouter([
    {
        path:"/",
        element: <NavBar/>,
        children:[
            {
                path:"/",
                element: <Home/>
            },
            {
                path:"/OneRep",
                element: <OneRepPage/>
            }
        ]
    }
])

export const Router = () => {
    return <RouterProvider router={router}/>
}