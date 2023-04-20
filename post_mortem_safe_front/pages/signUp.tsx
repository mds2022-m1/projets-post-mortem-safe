import Head from 'next/head'
import React, { FormEvent, useState } from 'react'
import { useCreateUser } from '../hooks/useCreateUser';
import { useLogin } from '../hooks/useLogin';


export default function SignUp() {

   const [createUser] = useCreateUser();
   const [login] = useLogin();

    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        try{
            const {data} = await createUser({variables: { nom: nom, prenom: prenom, email: email, mdp: password}})
            const {data: {authLogin: user}} = await login({variables: {username: email, password: password}})
        }
        catch(e){
            console.log(e)
        }

    }


    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-500">
        <Head>
            <title>Post Mortem Chest</title>
            <meta name="description" content="Generated by Post Mortem Chest" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-white text-6xl mb-11">
            Post Mortem Chest
        </h1>
        <div className="bg-white rounded-2xl shadow-2xl flex flex-row max-w-4xl items-center">
            {/* SIGN IN DIV */}
            <div className="p-5">
                <div className="text-left font-bold">
                Post Mortem Chest
                </div>
                <div className="p-10 flex">
                    <h2 className="text-3xl font-bold mb-1">Créez votre compte !</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center">
                        <div className="bg-gray-100 w-64 p-2 flex items-center rounded-xl mb-3 ">
                            <input required type="nom" name="nom" value={nom} onChange={(e) => setNom(e.target.value)}  placeholder="Nom" className="bg-gray-100 outline-none flex-1 m-2"/>
                        </div>
                        <div className="bg-gray-100 w-64 p-2 flex items-center rounded-xl mb-3">
                            <input required type="prenom" name="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Prénom" className="bg-gray-100 outline-none flex-1 m-2"/>
                        </div>
                        <div className="bg-gray-100 w-64 p-2 flex items-center rounded-xl mb-3 ">
                            <input required type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}   placeholder="Email" className="bg-gray-100 outline-none flex-1 m-2"/>
                        </div>
                        <div className="bg-gray-100 w-64 p-2 flex items-center rounded-xl mb-3">
                            <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}   placeholder="Mot de passe" className="bg-gray-100 outline-none flex-1 m-2"/>
                        </div>
                        <div className="flex w-64 mb-5">
                            <button type="submit">S&apos;inscrire</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </main>
    </div>
    )
}

