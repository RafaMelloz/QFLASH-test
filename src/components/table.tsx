"use client"

import useStore from "@/store/users";
import { User } from "@/utils/types";
import { redirect } from "next/navigation";
import { useState } from "react";
import { TbChevronLeft, TbChevronRight, TbChevronsLeft, TbChevronsRight, TbHomePlus } from "react-icons/tb";

export function Table(){
    const { users, searchValue, selectUser } = useStore();
    const [page, setPage] = useState(1);

    const filteredUsers = users.filter(user =>
        searchValue === '' ||
        user.name.toLowerCase().includes((searchValue ?? '').toLowerCase())
    );

    // tota de paginas e paginacao   
    const sortedUsers = filteredUsers;
    const totalPages = Math.max(Math.ceil(sortedUsers.length / 10), 1);
    const paginatedUsers = sortedUsers.slice((page - 1) * 10, page * 10);

    const goToNextPage = () => setPage(page + 1);
    const goToLastPage = () => setPage(totalPages);
    const goToFirstPage = () => setPage(1);
    const goToPreviousPage = () => setPage(page - 1);

    function redirectToAddress(user: User) {
        selectUser(user);
        redirect("/dashboard/address");
    }

    return(
        <table className="w-full bg-green-400/50 text-black mt-2">
            <thead>
                <tr className="bg-slate-100 dark:bg-dark-900 text-sm md:text-xl">
                    <th className="py-2 font-medium">Nome</th>
                    <th className="py-2 font-medium">E-mail</th>
                    <th className="py-2 font-medium">Faturamento Anual</th>
                    <th className="py-2 font-medium">Endereço</th>
                </tr>
            </thead>

            <tbody>
                {paginatedUsers.length > 0 ? (
                    paginatedUsers.map(user => (
                        <tr key={user.id} className="even:bg-slate-100 text-xs md:text-base">
                            <td className="text-center h-9">{user.name}</td>
                            <td className="text-center h-9 truncate max-w-20 sm:max-w-none">{user.email}</td>
                            <td className="text-center h-9">{user.annualRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            <td className="flex justify-center items-center bg-slate-100 h-9">
                                <button className="bg-persoGreen/60 rounded text-white mx-auto px-2 flex items-center h-[90%] hover:bg-persoGreen duration-200" onClick={() => redirectToAddress(user)}>
                                    <TbHomePlus size={24} />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={4} className="text-center py-4">
                            Nenhum usuario registrado
                        </td>
                    </tr>
                )}
            </tbody>

            <tfoot>
                <tr className="bg-slate-100 dark:bg-dark-900">
                    <td colSpan={4} className="pt-2">
                        <div className={`items-center gap-8 inline-flex justify-between w-full`}>
                            <div className="flex gap-1.5">
                                <button
                                    onClick={goToFirstPage}
                                    disabled={page === 1}
                                    className={`p-2 rounded border-[1px] border-azul-900 ${page === 1 ? 'bg-azul-900/50 cursor-not-allowed' : ''}`}
                                >
                                    <TbChevronsLeft className={`size-4 ${page === 1 ? 'stroke-black/50 cursor-not-allowed' : ''}`} />
                                </button>

                                <button
                                    onClick={goToPreviousPage}
                                    disabled={page === 1}
                                    className={`p-2 rounded border-[1px] border-azul-900 ${page === 1 ? 'bg-azul-900/50' : ''}`}
                                >
                                    <TbChevronLeft className={`size-4 ${page === 1 ? 'stroke-black/50' : ''}`} />
                                </button>
                            </div>

                            <span>Página {page} de {totalPages}</span>

                            <div className="flex gap-1.5">
                                <button
                                    onClick={goToNextPage}
                                    disabled={page === totalPages}
                                    className={`p-2 rounded border-[1px] border-azul-900 ${page === totalPages ? 'bg-azul-900/50 cursor-not-allowed' : ''}`}
                                >
                                    <TbChevronRight className={`size-4 ${page === totalPages ? 'stroke-black/50' : ''}`} />
                                </button>

                                <button
                                    onClick={goToLastPage}
                                    disabled={page === totalPages}
                                    className={`p-2 rounded border-[1px] border-azul-900 ${page === totalPages ? 'bg-azul-900/50 cursor-not-allowed' : ''}`}
                                >
                                    <TbChevronsRight className={`size-4 ${page === totalPages ? 'stroke-black/50' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    )

}