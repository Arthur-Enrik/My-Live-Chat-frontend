import { FormEvent, useState, useMemo } from "react"
import API from '../../utils/fetch.utils'

import { X } from "lucide-react"

interface Props {
    setShowAddChat?: (show: boolean) => void
}

function AddChat({setShowAddChat}: Props) {
    const token = useMemo(() => localStorage.getItem('token') || '', [])

    const [email, setEmail] = useState<string>('')
    const [nickname, setNickname] = useState<string>('')

    async function addChat(event: FormEvent) {
        event.preventDefault()

        const api = new API('http://localhost:3000/api/chats', "POST", {nickname, email}, token)
        try {
            setShowAddChat?.(false)
            const res = await api.fetch()
            const data = await res.json().catch(() => ({}))
            console.log(res)
            console.log(data)

            if (!res.ok) throw new Error(data.message ? data.message : `Status: ${res.status}`)

        } catch (error) {
            alert(error)
        }

    }

    return (
        <form onSubmit={addChat} className="bg-zinc-800 w-96 h-44 z-50 flex flex-col gap-2 ease-in-out pt-6 justify-center items-center fixed top-3 left-1/2 rounded-md shadow-2xl" style={{ left: '50%', transform: 'translateX(-50%)' }}>
            <button onClick={() => {setShowAddChat?.(false)}} className="absolute right-2 top-1 hover:cursor-pointer"><X /></button>
            <p className="absolute top-1">Adicionar um contato</p>
            <input required value={email} onChange={e => setEmail(e.target.value)} className="text-center border-1 rounded-md p-1" type="text" placeholder="Email do usuário" />
            <input required value={nickname} onChange={e => setNickname(e.target.value)} className="text-center border-1 rounded-md p-1" type="text" placeholder="Apelido que deseja"/>
            <button type="submit" className="bg-zinc-500 rounded-md p-1 hover:cursor-pointer hover:bg-white/20">Adicionar</button>
        </form>
    )
}

export {AddChat}