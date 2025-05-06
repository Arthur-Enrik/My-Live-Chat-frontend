import { User } from "lucide-react"

interface Props {
    email: string,
    username: string
    addUser: (email: string) => void
}

function UserCell({email, username, addUser}: Props) {
    return(
        <ul onClick={() => addUser(email)} className="flex rounded bg-zinc-700 p-2 gap-3 hover:bg-white/40">
            <User />
            <p>{email}</p>
            <p>{username}</p>
        </ul>
    )
}
export {UserCell}