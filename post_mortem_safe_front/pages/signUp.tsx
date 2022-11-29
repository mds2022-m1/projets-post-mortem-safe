import Head from 'next/head'
import React from 'react'

export default function SignUp() {
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
                <div className="py-10 flex">
                    <h2 className="text-3xl font-bold mb-2">Créez votre compte !</h2>
                </div>
                <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex items-center rounded-xl mb-3 ">
                    <input type="nom" name="nom" placeholder="Nom" className="bg-gray-100 outline-none flex-1 m-2"/>
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center rounded-xl mb-3">
                    <input type="prenom" name="prenom" placeholder="Prénom" className="bg-gray-100 outline-none flex-1 m-2"/>
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center rounded-xl mb-3 ">
                    <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none flex-1 m-2"/>
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center rounded-xl mb-3">
                    <input type="password" name="password" placeholder="Mot de passe" className="bg-gray-100 outline-none flex-1 m-2"/>
                </div>
                <div className="flex w-64 mb-5">
                    <label className="flex items-center text-xs"> 
                    <input type="checkbox" name="remember" className="mr-1"/>Se souvenir de moi
                    </label>
                </div>
                </div>
            </div>
        </div>
        </main>
    </div>
    )
}