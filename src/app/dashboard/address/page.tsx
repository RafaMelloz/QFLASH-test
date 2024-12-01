"use client"

import { Input } from "@/components/input";
import useStore from "@/store/users";
import { errorAlert, sucessAlert } from "@/utils/alerts";
import { api } from "@/utils/axios";
import { maskCep } from "@/utils/maks";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuChevronLeft } from "react-icons/lu"
import { z } from "zod";

const FormSchema = z.object({
    street: z.string().min(1, 'Este campo não pode ser vazio'),
    city: z.string().min(1, 'Este campo não pode ser vazio'),
    state: z.string().min(1, 'Este campo não pode ser vazio'),
    cep: z.string().min(9, 'CEP com formato invalido'),
});

type FormData = z.infer<typeof FormSchema>;

export default function AdressPage(){

    const { selectedUser, selectUser, updateAddress } = useStore();
    const [ isEditing, setIsEditing ] = useState(selectedUser?.address ? false : true);
    const { register, handleSubmit, formState: { errors }, setValue,
    } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
    }); 

    const sendForm = async (data: FormData) => {
        const updatedAddress = {
            street: data.street,
            city: data.city,
            state: data.state,
            cep: data.cep
        };

        try {
             await api.patch(`/users/${selectedUser?.id}`, {
                address: updatedAddress
            });
            
            if (selectedUser) {
                updateAddress(selectedUser.id, updatedAddress);                
                selectUser({
                    ...selectedUser,
                    address: updatedAddress,
                });
            }

            sucessAlert("Endereço adicionado com sucesso");
            setIsEditing(false);
        } catch (error) {
            errorAlert("Erro adicionar endereço");
        } 
    }

    const removeAddress = async () => {
        try {
            await api.patch(`/users/${selectedUser?.id}`, {
                address: null
            });

            if (selectedUser) {
                updateAddress(selectedUser.id, null);
                selectUser({
                    ...selectedUser,
                    address: undefined,
                });
            }
            setIsEditing(true);
            sucessAlert("Endereço removido com sucesso");
        } catch (error) {
            errorAlert("Erro ao remover endereço");
        }
    }

    const editingAddress = () => {
        if (selectedUser?.address) {
            setIsEditing(true);
            setValue("street", selectedUser.address.street);
            setValue("city", selectedUser.address.city);
            setValue("state", selectedUser.address.state);
            setValue("cep", selectedUser.address.cep);
        }
    }

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maskedValue = maskCep(e.target.value);
        setValue("cep", maskedValue);
    };

    return (
        <main className="container mx-auto px-2 md:px-0 pb-10">
            <Link href="/dashboard" className="rounded-full p-2 border-2 border-black/40 text-black/40 block w-fit hover:border-persoGreen hover:text-black duration-150">
                <LuChevronLeft size={24}/>
            </Link>

            <section className="flex gap-10">
                <div>
                    <h2 className="mt-5 mb-5 font-bold text-2xl">Informações pessoais</h2>
                    <div className="flex flex-col gap-1 text-lg">
                        <p><span className="font-bold">Nome:</span> {selectedUser?.name}</p>
                        <p><span className="font-bold">E-mail:</span> {selectedUser?.email}</p>
                        <p><span className="font-bold">Faturamento Anual:</span> {selectedUser?.annualRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                </div>

                {selectedUser?.address && (
                    <div className="mt-5">
                        <h2 className="font-bold text-2xl mb-5">Endereço</h2>
                        <p><span className="font-bold">Rua:</span> {selectedUser.address.street}</p>
                        <p><span className="font-bold">Cidade:</span> {selectedUser.address.city}</p>
                        <p><span className="font-bold">Estado:</span> {selectedUser.address.state}</p>
                        <p><span className="font-bold">CEP:</span> {selectedUser.address.cep}</p>
                    </div>
                )}
            </section>

            {selectedUser?.address && !isEditing && (
                <div className="flex gap-2 font-semibold mt-5">
                    <button className="p-2 rounded text-white bg-yellow-500 hover:bg-yellow-600 duration-150" onClick={editingAddress}>Editar endereço</button>
                    <button className="p-2 rounded text-white bg-red-600 hover:bg-red duration-150" onClick={removeAddress}>Remover endereço</button>
                </div>
            )}

            {isEditing && (
                <section className="mt-5">
                    <h2 className="font-bold text-2xl mb-5">
                        {selectedUser?.address ? "Editar Endereço" : "Adicionar Endereço"}
                    </h2>

                    <form onSubmit={handleSubmit(sendForm)} className="flex flex-col gap-4">
                        <Input name="street" placeholder="Rua" type="text" register={register} error={errors.street?.message}/>
                        <Input name="city" placeholder="Cidade" type="text" register={register} error={errors.city?.message}/>
                        <Input name="state" placeholder="Estado" type="text" register={register} error={errors.state?.message}/>
                        <Input name="cep" placeholder="CEP" type="text" register={register} error={errors.cep?.message} onChange={handleCepChange}/>
                        
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="p-2 rounded text-white bg-persoGreen hover:bg-[#14bf58] duration-150"
                            >
                                Salvar
                            </button>

                            {selectedUser?.address && (
                                <button
                                    type="button"
                                    className="p-2 rounded text-white bg-red-600 hover:bg-red duration-150"
                                    onClick={removeAddress}
                                >
                                    Remover
                                </button>
                            )}
                        </div>
                    </form>
                </section>
            ) }
        </main>
    )
}