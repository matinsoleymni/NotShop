import { NavLink } from "react-router";
import NotLogo from "../assets/icons/logo.svg?react";

export default function BottomNavigation() {
    return (
        <nav className="px-5 py-1 fixed w-full bottom-0 grid grid-cols-2 bg-white dark:bg-black dark:text-white text-black">
             <NavLink to="/" className={"flex flex-col items-center"}>
                <NotLogo className="w-6 h-6 mx-auto dark:invert-100" />
                <p className="mt-1 text-[10px] font-medium">Store</p>
            </NavLink>
            <NavLink to="/profile" className={"flex flex-col items-center"}>
                <NotLogo className="w-6 h-6 mx-auto dark:invert-100" />
                <p className="mt-1 text-[10px] font-medium">Alex</p>
            </NavLink>
        </nav>
    );
}
