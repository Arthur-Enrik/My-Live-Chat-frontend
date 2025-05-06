import { FormEvent, useState, useMemo } from "react"
import { getUserByEmail } from "../../services/User/get-users-by-email.service"
import { addChat } from "../../services/Chat/add-chat.service"

import { UserCell } from "./UserCell"

import { X } from "lucide-react"

interface Props {
    setShowOverlay: (balue: boolean) => void
}

function OverlayAddUser({setShowOverlay}: Props) {
    const [users, setUsers] = useState<Array<{username: string, email: string}>>([])

    async function getUsers(email: string) {
        if (!email) return

        try {
            const users = await getUserByEmail(email)
            setUsers(users)
        } catch (error) {
            console.log(error)
        }
    }

    async function addUser(email: string) {
        try {
            const message = await addChat(email)
            alert(message)
            setShowOverlay(false)
        } catch (error) {
            alert(error)
            console.log(error)
        }
    }

    return (
        <div className="fixed w-screen h-screen inset-0 bg-black/50 flex justify-center items-center z-50 ">
            <div className="flex flex-col p-2 w-90 h-1/2 bg-zinc-800 rounded-md z-20">
                <button className="fixed self-start hover:cursor-pointer" onClick={() => setShowOverlay(false)}><X /></button>
                <li className="flex flex-col mt-4 gap-2 p-2 w-full overflow-y-auto h-full">
                    {users.length > 0 ? users.map(user => <UserCell addUser={addUser} username={user.username} email={user.email} key={user.email} />) : <span className="text-center w-full">Não foi encontrado nenhum usuário</span>}
                </li>
                <form onSubmit={(e) => e.preventDefault()} className="flex w-full h-fit self-end-safe gap-2 bg-zinc-700 p-1 rounded-md">
                    <input onChange={e => getUsers(e.target.value)} type="email" placeholder="Digite o email do usuário" className="h-8 w-full outline-none p-1" />
                    <button type="submit" className="w-fit hover:cursor-pointer hover:bg-black/20">Adicionar</button>
                </form>
            </div>
        </div>
    )
}

export { OverlayAddUser }