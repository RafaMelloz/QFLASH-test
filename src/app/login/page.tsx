import Link from "next/link";
import { FormUserAuthentication } from "@/components/forms/userAuthentication";

export default function LoginPage() {
    return (
        <main className="w-full h-screen flex justify-between items-center">
            <div className="w-4/12 h-screen hidden md:flex items-center justify-center flex-col bg-persoGreen text-white p-6">
                <h2 className="text-2xl font-bold">Ainda não tem uma conta?</h2>
                <p className=" text-lg ">Crie uma agora mesmo!</p>
                <Link href={'/'} className="mt-5 border-2 border-white rounded-3xl p-2 w-full text-center font-semibold max-w-72 hover:bg-white hover:text-persoGreen transition-all duration-150">Criar</Link>
            </div>

            <div className="w-full md:w-8/12 p-6">
                <h2 className="font-bold text-3xl text-persoGreen text-center">Entre na sua conta</h2>
                <h5 className="text-center text-xl">Insira seus dados para entrar na sua conta</h5>
                <FormUserAuthentication />
                <p className="mt-2 block md:hidden">Ainda não tem uma conta? <Link href={'/'} className="text-persoGreen underline decoration-1">Crie agora!</Link></p>
            </div>
        </main>
    );
}
