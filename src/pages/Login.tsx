import { loginUser } from '../services/User/login-user.service'
import { useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import {Mail, Lock, SendHorizonal} from 'lucide-react'

function Login() {
    const navigate = useNavigate()
    
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')


    async function submitHandler(event: FormEvent) {
        event.preventDefault()
        
        try {
            const message = await loginUser(email.toLowerCase().trim(), password.trim())
            alert(message)
            navigate('/chats')
        } catch (error) {
            setEmailError(String(error))
        }
    }
    return (
        <div className="bg-zinc-900 h-86 w-96 rounded-md p-2 text-white shadow-md">
            <h3 className="text-center">Digite suas informações para efetuar o login</h3>
           <form onSubmit={submitHandler} className="h-full w-full flex flex-col gap-10 items-center justify-center">
            <div>
                <div className='flex gap-2 border-b-white border-b-1 p-1'>
                    <Mail />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='outline-none' type="email" required placeholder="Digite seu email" />
                </div>
                {emailError && <span className='w-full text-red-500 text-center'>{emailError}</span>}
            </div>

            <div>
                <div className='flex gap-2 border-b-white border-b-1 p-1'>
                    <Lock />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className='outline-none' type="password" required placeholder="Digite sua senha" />
                </div>
                {passwordError && <span className='w-full text-red-500 text-center'>{passwordError}</span>}
            </div>
            <div className='flex gap-2'>
                <button type="submit" className='flex items-center gap-2 bg-white/20 p-2 rounded-md hover:bg-white/50 hover:cursor-pointer'>Entrar <SendHorizonal size={20} /></button>
            </div>
           </form>
        </div>
    )
}

export {Login}