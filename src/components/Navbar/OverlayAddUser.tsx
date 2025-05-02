import { FormEvent, useState, useMemo } from "react"

import { X } from "lucide-react"

import { getUserByEmail } from "../../services/User/get-users-by-email.service"

import { UserCell } from "./UserCell"

interface Props {
    setShowOverlay: (balue: boolean) => void
}

function OverlayAddUser({setShowOverlay}: Props) {
    const [inputEmail, setInputEmail] = useState<string>('')
    const [users, setUsers] = useState<Array<{username: string, email: string}>>([])

    async function getUsers() {
        if (!inputEmail) return
        const users = await getUserByEmail(inputEmail)
        setUsers(users)
    }

    return (
        <div className="fixed w-screen h-screen inset-0 bg-black/50 flex justify-center items-center z-50 ">
            <div className="flex flex-col p-2 w-90 h-1/2 bg-zinc-800 rounded-md z-20">
                <button className="fixed self-start hover:cursor-pointer" onClick={() => setShowOverlay(false)}><X /></button>
                <li className="flex flex-col gap-2 p-2 w-full overflow-y-auto h-full">
                    {users.length > 0 ? users.map(user => <UserCell username={user.username} email={user.email} key={user.email} />) : <span className="text-center w-full">Não foi encontrado nenhum usuário</span>}
                </li>
                <form onSubmit={(e) => e.preventDefault()} className="flex w-full h-fit self-end-safe gap-2 bg-zinc-700 p-1 rounded-md">
                    <input value={inputEmail} onChange={e => {setInputEmail(e.target.value); getUsers()}} type="email" placeholder="Digite o email do usuário" className="h-8 w-full outline-none p-1" />
                    <button type="submit" className="w-fit hover:cursor-pointer hover:bg-black/20">Adicionar</button>
                </form>
            </div>
        </div>
    )
}

export { OverlayAddUser }