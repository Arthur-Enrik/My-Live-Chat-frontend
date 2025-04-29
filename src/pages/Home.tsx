import { useCallback, useEffect, useMemo, useState } from "react"
import { io } from 'socket.io-client'
import API from "../utils/fetch.utils"

import { ContactsNavbar } from "../components/ContactNavbar/ContactsNav"
import { MessageInput } from "../components/Message/MessageInput"

import { Header } from "../components/Home/Header"
import { ChatWindow } from "../components/Home/ChatWindow"

// eslint-disable-next-line
export const token = localStorage.getItem('token') || '' // Temp
export const id = 'd552e529-2c19-4536-b592-0b12ff44b1b3'

interface Chat {
    _id: string
    username: string
    messages: Array<{message: string, isOwner: boolean, id: string}>
}


function Home() {
    const socket = useMemo(() => io('http://localhost:3000', {auth: {token}}), [])

    const [activeChat, setActiveChat] = useState<string>('')
    const [chats, setChats] = useState<Record<string, Chat>>({})

    const chat = useMemo(() => chats[activeChat], [activeChat, chats])

    const getUserChats = () => {
        const api = new API('http://localhost:3000/api/svc/chat/get', "GET", undefined, token)
        api.fetch().then(res => res.json()).then(res => setChats(res.chats))
    }

    function saveChat(username: string, email: string) {
        const api = new API('http://localhost:3000/api/svc/chat/add', "POST", {nickname: username, email: email})
    }

    const createChat = useCallback( async (userToAddId: string, message?: string, nickname?: string) => {
        const api = new API(`http://localhost:3000/api/svc/get/${userToAddId}`, "GET", undefined, token)
        try {

            const res = await api.fetch()
            const data = await res.json().catch(() => ({}))
            if (!res.ok || !data || !data.user) return
            setChats((prevChats) => {
                const createChat: Chat = {
                    username: data.user.username,
                    _id: data.user._id,
                    messages: message ? [{message, isOwner: false, id: crypto.randomUUID()}] : []
                }
                return {
                    ...prevChats,
                    [nickname || data.user.username]: createChat
                }
            })

            return chats
        } catch (error) {
            return chats
        }
    }, [chats])

    function sendMessage(newMessage: string) {
        console.log(newMessage)
        console.log(chats)
        if (!newMessage) return chats
        if (!chat || !chat._id) return chats

        setChats((prevChats) => {
            const currentChat = prevChats[activeChat]

            if (!currentChat) return prevChats
            const updatedChat: Chat = {
                ...currentChat,
                messages: [...currentChat.messages, {message: newMessage, isOwner: true, id: crypto.randomUUID()} ]
            }
            return {
                ...prevChats,
                [activeChat]: updatedChat
            }
        })

        socket.emit('message:sended', {senderId: id, receivedId: chat._id, msg: newMessage})
    }

    const receiveMessage = useCallback( async (data: {from: string, message: string}) => {
        console.log('Recebida!')
        if (!data) return
        const {from, message} = data

        if (!Object.entries(chats).find(([_, chat]) => chat._id === from)) {
            await createChat(from, message)
        }
        
    }, [createChat, chats])

    const socketInit = () => {
        socket.on('connect', () => console.log('Socket conectado!'))
        socket.on('connect_error', (error) => console.error(error))
        socket.on('disconnect', (message) => console.log(message))
        socket.on('message:received', receiveMessage)
    }

    useEffect(() => {
        getUserChats()
        socketInit()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main className="h-1/2 w-6xl bg-zinc-900 rounded-md flex z-10 shadow-md">
            <ContactsNavbar chats={Object.keys(chats)} setActiveWindow={setActiveChat} />
            <section className="w-full h-full p-1 flex flex-col">
                <Header nickname={activeChat} />
                <ChatWindow messages={chat?.messages} />
                <MessageInput  sendMessage={sendMessage}/>
            </section>
        </main>
    )
}

export { Home }







