import { User } from "lucide-react"

interface Props {
    nickname?: string
}

function Header({nickname}: Props) {
    return (
        <header className="flex w-full items-center p-3 gap-2 bg-zinc-800 text-white h-8 rounded-md">
            {nickname && <User />}
            {nickname && <p>{nickname}</p>}
        </header>
    )
}

export {Header}