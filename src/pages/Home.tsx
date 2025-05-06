import { useEffect, useMemo, useState } from "react"
import { io } from 'socket.io-client'

// Services
import { getChat } from "../services/Chat/get-chats.service"
import { TOKEN } from "../utils/token.utils"

// Components
import { ContactsNavbar } from "../components/Navbar/ChatsNavbar"
import { MessageInput } from "../components/Chat/MessageInput"

import { Header } from "../components/Ui/Header"
import { ChatWindow } from "../components/Chat/ChatWindow"

// Interfaces
import { Chat } from "../interfaces/IChat.interface"

function Home() {
    const socket = useMemo(() => io('http://localhost:3000', {auth: {token: TOKEN.get()}}),[])

    const [activeChat, setActiveChat] = useState<string>('')
    const [chats, setChats] = useState<Chat>({})

    const chatNames = useMemo(() => {
        let names: Array<string> = []
        for (const [_, item] of Object.entries(chats)) {
            names.push(item.username)
        }
        return names
    }, [chats])

    useEffect(() => {
        saveChats()
        socketInit()
    }, [])

    async function saveChats() {
        try {
            const chats = await getChat()
            setChats(chats)
        } catch (error) {
            alert(error)
        }
    }

    function socketInit() {
        socket.on('connect', () => console.log('Socket conectado!'))
        socket.on('connect_error', (msg) => console.log(msg))
    }

    return (
        <main className="h-1/2 w-6xl bg-zinc-900 rounded-md flex z-10 shadow-md">
            <ContactsNavbar chats={chatNames} setActiveChat={setActiveChat} />
            <section className="w-full h-full p-1 flex flex-col">
                <Header />
                <ChatWindow />
                <MessageInput />
            </section>
        </main>
    )
}

export { Home }







