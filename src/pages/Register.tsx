import { FormEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'

import {Mail, Lock, SendHorizonal, User} from 'lucide-react'

function Register() {
    return (
        <div className="bg-zinc-900 h-86 w-96 rounded-md p-2 text-white shadow-md">
            <h3 className="text-center">Digite suas informações para criar um login </h3>
           <form className="h-full w-full flex flex-col gap-6 items-center justify-center">
           <div className='flex gap-2 border-b-white border-b-1 p-1'>
                <User />
                <input className='outline-none' type="text" required placeholder="Digite seu nome" />
            </div>
            <div className='flex gap-2 border-b-white border-b-1 p-1'>
                <Mail />
                <input className='outline-none' type="email" required placeholder="Digite seu email" />
            </div>
            <div className='flex gap-2 border-b-white border-b-1 p-1'>
                <Lock />
                <input className='outline-none' type="password" required placeholder="Digite sua nova senha" />
            </div>
            <div className='flex gap-2'>
                <button type="submit" className='flex items-center gap-2 bg-white/20 p-2 rounded-md hover:bg-white/50 hover:cursor-pointer'>Criar <SendHorizonal size={20} /></button>
            </div>
           </form>
        </div>
    )
}
export {Register}