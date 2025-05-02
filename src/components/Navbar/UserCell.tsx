import { User } from "lucide-react"

interface Props {
    email: string,
    username: string
}

function UserCell({email, username}: Props) {
    return(
        <ul className="flex p-1 gap-3 hover:bg-white/10">
            <User />
            <p>{email}</p>
            <p>{username}</p>
        </ul>
    )
}
export {UserCell}