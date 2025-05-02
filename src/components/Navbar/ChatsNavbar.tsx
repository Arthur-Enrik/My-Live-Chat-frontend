import { useState } from "react"
import { PlusCircle } from "lucide-react"

import { Contact } from "./Contact"
import {OverlayAddUser} from './OverlayAddUser'

function ContactsNavbar() {
    const [showOverlay, setShowOverlay] = useState<boolean>(true)
    return(
        <nav className="w-1/4 flex flex-col text-white bg-zinc-800 rounded-md relative">
            {showOverlay && <OverlayAddUser setShowOverlay={setShowOverlay} />}
            <ul className="w-full flex flex-col overflow-y-auto divide-gray-100 divide-y">
                {/* {chats ? chats.map(item => <Contact nickname={item} setActiveWindow={setActiveWindow} key={item} />) : <span className="w-full text-center text-white p-3">Você ainda não possui nenhum contato</span> } */}
            </ul>
            <button onClick={() => setShowOverlay(!showOverlay)} className="absolute bottom-2 right-2 hover:cursor-pointer hover:bg-white/20 rounded-full">
                <PlusCircle/>
            </button>
        </nav>

    )
}

export {ContactsNavbar}