"use client"

import useStore from "@/store/users";
import { redirect } from "next/navigation";

export function Header(){
    const { loggedUser, logout } = useStore();

    const handlelogout = () => {
        logout();
        redirect('/login');
    }

    return(
        <header className="py-4 px-1 md:px-0 border-b border-b-persoGreen mb-5">
            <nav className="container mx-auto flex justify-between">
                <h2 className="font-semibold text-2xl">Olá, {loggedUser?.name}</h2>

                <button className="bg-persoGreen py-1.5 px-4 font-semibold text-white rounded-full hover:bg-[#14bf58] duration-150" onClick={handlelogout}>Sair</button>
            </nav>
        </header>
    )
}
