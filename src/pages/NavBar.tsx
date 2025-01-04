import {Outlet} from "react-router-dom";

export const NavBar = () => {
    return (
        <>
            <nav className="min-h-screen w-screen fixed">
                <header className="h-20 w-full bg-primary-dark
                  flex items-center justify-between z-50">
                    <img className="h-20 ml-10" src="/src/assets/samsonWikiLogoDarkFull.png" alt="SamsonWiki"/>
                    <button className="h-16 w-16 mr-10 bg-primary-light rounded-full"></button>
                </header>
                <aside className="flex-col w-60 h-screen bg-primary-medium">dsa</aside>
            </nav>
            <main className="pt-20 pl-60">
                <Outlet/>
            </main>
        </>
    )
}