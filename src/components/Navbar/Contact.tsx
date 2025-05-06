import { User } from "lucide-react"

interface Props {
    chatName: string
    setActiveChat: (chatName: string ) => void
}

function Contact({chatName, setActiveChat}: Props) {
    return(
        <li onClick={() => setActiveChat(chatName)} className="flex gap-2 w-full h-fit text-white p-2 rounded-md hover:bg-white/20 hover:cursor-pointer">
            <User />
            <p>{chatName}</p>
        </li>
    )
}

export {Contact}