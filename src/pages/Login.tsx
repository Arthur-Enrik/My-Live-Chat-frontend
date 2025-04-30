import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {Mail, Lock, SendHorizonal} from 'lucide-react'

import API from '../utils/fetch.utils'

function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()
    
    async function loginUser(event: FormEvent) {
        event.preventDefault()

        if (!email || !password) return

        const api = new API('http://localhost:3000/api/users/auth', 'POST', {email, password})
        try {
            const res = await api.fetch()
            const data = await res.json().catch(() => ({}))

            if (!res.ok || !data.token) throw new Error(data.message || data.details || `Ocorreu um erro status: ${res.status}`)
            
            localStorage.removeItem('token')
            localStorage.setItem('token', data.token)

            alert('Você está logado!')
            navigate('/chats')
        } catch (error) {
            alert(error)
            console.error(error)
        }
    }
    return (
        <div className="bg-zinc-900 h-86 w-96 rounded-md p-2 text-white shadow-md">
            <h3 className="text-center">Digite suas informações para efetuar o login</h3>
           <form onSubmit={loginUser} className="h-full w-full flex flex-col gap-10 items-center justify-center">
            <div className='flex gap-2 border-b-white border-b-1 p-1'>
                <Mail />
                <input value={email} onChange={(e) => setEmail(e.target.value)} className='outline-none' type="email" required placeholder="Digite seu email" />
            </div>
            <div className='flex gap-2 border-b-white border-b-1 p-1'>
                <Lock />
                <input value={password} onChange={(e) => setPassword(e.target.value)} className='outline-none' type="password" required placeholder="Digite sua senha" />
            </div>
            <div className='flex gap-2'>
                <button type="submit" className='flex items-center gap-2 bg-white/20 p-2 rounded-md hover:bg-white/50 hover:cursor-pointer'>Entrar <SendHorizonal size={20} /></button>
            </div>
           </form>
        </div>
    )
}

export {Login}