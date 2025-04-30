import { FormEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'

import {Mail, Lock, SendHorizonal, User} from 'lucide-react'

import API from '../utils/fetch.utils'


function Register() {
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    
    async function registerUser(event: FormEvent) {
        event.preventDefault()

        if (!username || !email || !password) return
        
        const api = new API('http://localhost:3000/api/users/register', 'POST', {username: username.trim(), email: email.trim(), password: password.trim()})
        try {
            const res = await api.fetch()
            const data = await res.json().catch(() => ({}))

            if (!res.ok || !data.token) throw new Error(data.message || data.details || `Ocorreu um erro status: ${res.status}`)
            
            alert('Seu usuário foi criado!')
        } catch (error) {
            alert(error)
        }
    }


    return (
        <div className="bg-zinc-900 h-86 w-96 rounded-md p-2 text-white shadow-md">
            <h3 className="text-center">Digite suas informações para criar um login </h3>
           <form onSubmit={registerUser} className="h-full w-full flex flex-col gap-6 items-center justify-center">
           <div className='flex gap-2 border-b-white border-b-1 p-1'>
                <User />
                <input value={username} onChange={(e) => setUsername(e.target.value)} className='outline-none' type="text" required placeholder="Digite seu nome" />
            </div>
            <div className='flex gap-2 border-b-white border-b-1 p-1'>
                <Mail />
                <input value={email} onChange={(e) => setEmail(e.target.value)} className='outline-none' type="email" required placeholder="Digite seu email" />
            </div>
            <div className='flex gap-2 border-b-white border-b-1 p-1'>
                <Lock />
                <input value={password} onChange={(e) => setPassword(e.target.value)} className='outline-none' type="password" required placeholder="Digite sua nova senha" />
            </div>
            <div className='flex gap-2'>
                <button type="submit" className='flex items-center gap-2 bg-white/20 p-2 rounded-md hover:bg-white/50 hover:cursor-pointer'>Criar <SendHorizonal size={20} /></button>
            </div>
           </form>
        </div>
    )
}
export {Register}