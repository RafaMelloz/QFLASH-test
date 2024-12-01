import Link from "next/link";
import { FormUserRegistration } from "@/components/forms/userRegistration";

export default function Home() {
  return (
    <main className="w-full h-screen flex justify-between items-center">
      <div className="w-4/12 h-screen hidden md:flex items-center justify-center flex-col bg-persoGreen text-white p-6">
        <h2 className="text-2xl font-bold">Ja possui uma conta?</h2>
        <p className=" text-lg ">Faça login e acesse nossa plataforma!</p>
        <Link href={'/login'} className="mt-5 border-2 border-white rounded-3xl p-2 w-full text-center font-semibold max-w-72 hover:bg-white hover:text-persoGreen transition-all duration-150">Entrar</Link>
      </div>

      <div className="w-full md:w-8/12 p-6">
          <h2 className="font-bold text-3xl text-persoGreen text-center">Crie sua conta</h2>
          <h5 className="text-center text-xl">Preencha os dados abaixo para criar sua conta</h5>
          <FormUserRegistration />
          <p className="mt-2 block md:hidden">Ja tem uma conta? <Link href={'/login'} className="text-persoGreen underline decoration-1">Entre agora!</Link></p>
      </div>
    </main>
  );
}
