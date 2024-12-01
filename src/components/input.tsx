"use client";

import { UseFormRegister } from "react-hook-form";

interface InputProps {
    name: string;
    type: string;
    label?: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
    name,
    type,
    label,
    register,
    error,
    placeholder,
    onChange,
}: InputProps) {
    return (
        <label htmlFor={name} className="w-full">
            {label && <span className="text-sm text-zinc-900">{label}</span>}
            <input
                autoComplete="off"
                type={type}
                id={name}
                className="w-full rounded-md border border-zinc-300 p-1.5 my-0.5 hover:border-persoGreen focus:border-persoGreen duration-100"
                placeholder={placeholder}
                {...register(name, { //caso tenha mascaras
                    onChange: (e) => {
                        onChange?.(e);
                    },
                })}
            />
            {error && <p className="text-red-500 text-xs md:text-sm font-semibold">{error}</p>}
        </label>
    );
}
