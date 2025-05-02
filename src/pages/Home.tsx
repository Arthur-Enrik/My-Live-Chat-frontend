import { useCallback, useEffect, useMemo, useState } from "react"
import { io } from 'socket.io-client'

// Components
import { ContactsNavbar } from "../components/Navbar/ChatsNavbar"
import { MessageInput } from "../components/Chat/MessageInput"

import { Header } from "../components/Ui/Header"
import { ChatWindow } from "../components/Chat/ChatWindow"

function Home() {
    return (
        <main className="h-1/2 w-6xl bg-zinc-900 rounded-md flex z-10 shadow-md">
            <ContactsNavbar />
            <section className="w-full h-full p-1 flex flex-col">
                <Header />
                <ChatWindow />
                <MessageInput />
            </section>
        </main>
    )
}

export { Home }







