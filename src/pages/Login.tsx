import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {Mail, Lock, SendHorizonal} from 'lucide-react'

function Login() {
    return (
        <div className="bg-zinc-900 h-86 w-96 rounded-md p-2 text-white shadow-md">
            <h3 className="text-center">Digite suas informações para efetuar o login</h3>
           <form className="h-full w-full flex flex-col gap-10 items-center justify-center">
            <div className='flex gap-2 border-b-white border-b-1 p-1'>
                <Mail />
                <input className='outline-none' type="email" required placeholder="Digite seu email" />
            </div>
            <div className='flex gap-2 border-b-white border-b-1 p-1'>
                <Lock />
                <input className='outline-none' type="password" required placeholder="Digite sua senha" />
            </div>
            <div className='flex gap-2'>
                <button type="submit" className='flex items-center gap-2 bg-white/20 p-2 rounded-md hover:bg-white/50 hover:cursor-pointer'>Entrar <SendHorizonal size={20} /></button>
            </div>
           </form>
        </div>
    )
}

export {Login}