import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase.ts";
import { doc, getDoc } from "firebase/firestore";
import { useLogin } from "../contexts/useLogin.ts";
import { LoginPopup } from "../components/LoginPopup.tsx";

export const NavBar = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [signedIn, setSignedIn] = useState(false);
    const [toggleLoginOptions, setToggleLoginOptions] = useState(false);
    const [username, setUsername] = useState("...");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { alreadyLoggingIn } = useLogin();

    useEffect(() => {
        const getUserName = async (uid) => {
            const userDoc = await getDoc(doc(db, `users/${uid}`));
            if (userDoc.exists()) setUsername(userDoc.data().username);
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setSignedIn(true);
                getUserName(user.uid);
            } else {
                setSignedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <>
            <header className="fixed min-h-20 top-0 left-0 w-full bg-primary-dark shadow-md z-50">
                <div className="flex min-h-20 items-center justify-between px-6">
                    <Link to="/">
                        <img className="h-16" src="/logo/SamsonWikiLogoDarkFull.png" alt="SamsonWiki" />
                    </Link>

                    {/* Hamburger */}
                    <Hamburger open={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)} />

                    {/* Desktop nav */}
                    <nav className="hidden md:flex gap-6 items-center text-white font-semibold py-5">
                        <NavLinkWithUnderline to="/plans" icon="/icons/planning.png" text="Training Plans" />
                        <NavLinkWithUnderline to="/" icon="/icons/dumbbell.png" text="Exercises By Muscle" />
                        <NavLinkWithUnderline to="/CalorieCalculator" icon="/icons/wrench.png" text="Calorie Calculator" />
                        <NavLinkWithUnderline to="/OneRep" icon="/icons/wrench.png" text="1 Rep Max Calculator" />
                        {signedIn ? (
                            <div className="relative">
                                <img
                                    onClick={() => setToggleLoginOptions(prev => !prev)}
                                    className="h-12 w-12 rounded-full cursor-pointer bg-secondary-light"
                                    src="/icons/user(1).png"
                                    alt="User"
                                />
                                {toggleLoginOptions && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                        <div className="p-2">
                                            Logged In As <span className="font-bold text-primary-medium">{username}</span>
                                        </div>
                                        <button
                                            className="p-2 hover:bg-gray-100 w-full text-left"
                                            onClick={() => {
                                                setToggleLoginOptions(false);
                                                signOut(auth);
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : !alreadyLoggingIn && (
                            <button
                                onClick={() => setIsLoggingIn(true)}
                                className="text-white font-bold px-6 py-2 bg-primary-medium rounded-md hover:scale-105 transition-all duration-300"
                            >
                                Login
                            </button>
                        )}
                    </nav>
                </div>
            </header>

            {/* Sidebar Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 right-0 h-full w-64 bg-primary-dark text-white transform ${
                    sidebarOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 z-50 md:hidden`}
            >
                <div className="flex flex-col items-start gap-4 p-6 mt-16 text-lg font-semibold">
                    <Link to="/plans" onClick={closeSidebar} className="flex items-center gap-2">
                        <img src="/icons/planning.png" className="w-6 h-6" />
                        Training Plans
                    </Link>
                    <Link to="/" onClick={closeSidebar} className="flex items-center gap-2">
                        <img src="/icons/dumbbell.png" className="w-6 h-6" />
                        Exercises By Muscle
                    </Link>
                    <Link to="/CalorieCalculator" onClick={closeSidebar} className="flex items-center gap-2">
                        <img src="/icons/wrench.png" className="w-6 h-6" />
                        Calorie Calculator
                    </Link>
                    <Link to="/OneRep" onClick={closeSidebar} className="flex items-center gap-2">
                        <img src="/icons/wrench.png" className="w-6 h-6" />
                        1 Rep Max Calculator
                    </Link>
                    {!signedIn && !alreadyLoggingIn && (
                        <button
                            onClick={() => {
                                setIsLoggingIn(true);
                                closeSidebar();
                            }}
                            className="mt-2 w-full bg-primary-medium py-2 rounded-md text-white font-bold"
                        >
                            Login
                        </button>
                    )}
                </div>
            </aside>

            {/* Page content */}
            <main className="pt-20 bg-white min-h-screen">
                <Outlet />
            </main>

            {/* Login Modal */}
            {isLoggingIn && (
                <main className="fixed inset-0 flex items-center justify-center bg-primary-transparent z-50">
                    <LoginPopup setIsLoggingIn={setIsLoggingIn} />
                </main>
            )}
        </>
    );
};

// Stylish Link component
const NavLinkWithUnderline = ({ to, icon, text }) => (
    <Link to={to} className="group relative flex items-center gap-2">
        <img src={icon} className="w-6 h-6" />
        <span className="relative pb-1 text-white font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-secondary-light after:transition-all after:duration-300 group-hover:after:w-full">
            {text}
        </span>
    </Link>
);

// Hamburger component
const Hamburger = ({ open, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex flex-col justify-center items-center w-10 h-10 z-50 md:hidden"
        >
            <div className={`bg-white h-1 w-6 my-[2px] rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <div className={`bg-white h-1 w-6 my-[2px] rounded transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <div className={`bg-white h-1 w-6 my-[2px] rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
    );
};
