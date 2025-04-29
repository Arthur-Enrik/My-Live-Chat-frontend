import { User } from "lucide-react"

interface Props {
    nickname: string
    setActiveWindow: (nickname: string ) => void
}

function Contact({nickname, setActiveWindow}: Props) {
    return(
        <li onClick={() => setActiveWindow(nickname)} className="flex gap-2 w-full h-fit text-white p-2 rounded-md hover:bg-white/20 hover:cursor-pointer">
            <User />
            <p>{nickname}</p>
        </li>
    )
}

export {Contact}