"use client"
import useStore from "@/store/users";
import { IoIosSearch } from "react-icons/io";

export function InputSearch() {
    const { searchValue, setSearchValue } = useStore();

    const searchPatient = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value.toLowerCase());
    };


    return(
        <label className="text px-3 py-1.5 w-full max-w-56 border-2 rounded-full flex items-center gap-3" htmlFor="inputBusca">
            <IoIosSearch size={28} className="text-cinza-900" />
            <input
                id="inputBusca"
                value={searchValue}
                onChange={searchPatient}
                className="bg-transparent text-black border-0 p-0 text-sm focus:ring-0 w-full"
                type="search"
                placeholder="Nome"
            />
        </label>
    )
}