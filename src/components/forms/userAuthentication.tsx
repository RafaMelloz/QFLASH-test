"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../input";
import { redirect } from "next/navigation";
import { errorAlert, sucessAlert } from "@/utils/alerts";
import { api } from "@/utils/axios";
import useStore from "@/store/users";

const FormSchema = z.object({
    email: z.string().email("O email informado é inválido"),
    password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres'),
});

type FormData = z.infer<typeof FormSchema>;

export function FormUserAuthentication(){
    const { register, handleSubmit, formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
    });
    const { login, setUsers } = useStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getUsers = async () => {
        try {
            const response = await api.get('/users');
            const users = response.data
            return users;
        } catch (error) {
            errorAlert("Erro ao conectar-se ao servidor");
        }
    }

    const sendForm = async (data: FormData) => {
        setIsSubmitting(true);

        try {
            const response = await api.get(`/users?email=${data.email}&password=${data.password}`);
            const user = response.data[0];

            if (user) {
                sucessAlert("Login realizado com sucesso, redirecionando...");
                const users = await getUsers();
                login(user);
                setUsers(users);
                setTimeout(() => {
                    redirect("/dashboard");
                }, 3000);
            } else{
                errorAlert("Senha ou email incorretos");
            }
        } catch (error) {
            errorAlert("Erro ao conectar-se ao servidor");
        } finally {
            setIsSubmitting(false);
        }
    }

    return(
        <form onSubmit={handleSubmit(sendForm)} className="flex flex-col gap-4 pt-5 mx-auto max-w-md">
            <Input name="email" placeholder="Email" type="text" register={register} error={errors.email?.message} />
            <Input name="password" placeholder="Senha" type="password" register={register} error={errors.password?.message} />


            <button type="submit" className="bg-persoGreen text-white p-2 rounded-3xl font-semibold tracking-wide hover:scale-105 hover:bg-[#14bf58] transition-all duration-150">
               Entrar
            </button>
        </form>
    )
}