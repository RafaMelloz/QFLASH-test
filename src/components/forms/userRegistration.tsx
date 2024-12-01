"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { maskMoney } from "@/utils/maks";
import { Input } from "@/components/input";
import { loadingAlert } from "@/utils/alerts";
import { api } from "@/utils/axios";
import { redirect } from "next/navigation";

const FormSchema = z.object({
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("O email informado é inválido"),
    password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres'),
    confirm: z.string(),
    annualRevenue: z.string().min(1, 'Campo obrigatório'),
}).refine(data => data.password === data.confirm, {
    message: "As senhas não coincidem",
    path: ["confirm"]
}).refine(data => {
    const annualRevenueNumeric = Number(data.annualRevenue.replace(/[^0-9,-]+/g, "").replace(",", "."));
    return annualRevenueNumeric > 0;
}, {
    message: "O faturamento anual deve ser maior que R$ 0,00",
    path: ["annualRevenue"]
});

type FormData = z.infer<typeof FormSchema>;

export function FormUserRegistration(){
    const { register, handleSubmit, formState: { errors }, setValue,
    } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const clearForm = () => {
        setValue("name", "");
        setValue("email", "");
        setValue("password", "");
        setValue("confirm", "");
        setValue("annualRevenue", "");
    }

    const sendForm = async (data: FormData) => {
        setIsSubmitting(true);
        
        // Remove a máscara para enviar o valor como número
        const annualRevenueNumeric = Number(
            data.annualRevenue.replace(/[^0-9,-]+/g, "").replace(",", ".")
        );  

        const { confirm, ...newData } = data;

        const promise = api.post('/users', { ...newData, annualRevenue: annualRevenueNumeric });

        loadingAlert("Cadastrando...", promise , "Cadastro realizado com sucesso", "Erro ao cadastrar");

        promise.then((response) => {
            if (response.status === 201 || response.status === 200) {
                clearForm();
                setTimeout(() => {
                    redirect("/login");
                }, 3000);
            }
        }).finally(() => {
            setIsSubmitting(false)
        });
    }

    const handleAnnualRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maskedValue = maskMoney(e.target.value);
        setValue("annualRevenue", maskedValue);
    };

    return(
        <form onSubmit={handleSubmit(sendForm)} className="flex flex-col gap-4 pt-5 mx-auto max-w-md">
            {/* <div className="space-y-2">
            <label htmlFor="name">Nome</label>
            <input id="name" {...register('name')} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div> */}

            <Input name="name" placeholder="Nome" type="text" register={register} error={errors.name?.message} />
            <Input name="email" placeholder="Email" type="text" register={register} error={errors.email?.message} />

            <div className="flex gap-4">
                <Input name="password" placeholder="Senha" type="password" register={register} error={errors.password?.message} />
                <Input name="confirm" placeholder="Confirme sua senha" type="password" register={register} error={errors.confirm?.message} />
            </div>

            <Input name="annualRevenue" placeholder="Faturamento Anual:" type="text" register={register} error={errors.annualRevenue?.message} onChange={handleAnnualRevenueChange} />

            <button type="submit" className="bg-persoGreen text-white p-2 rounded-3xl font-semibold tracking-wide hover:scale-105 hover:bg-[#14bf58] transition-all duration-150">
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </button>
        </form>
    )
}