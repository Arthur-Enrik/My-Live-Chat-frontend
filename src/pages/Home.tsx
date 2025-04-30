import { useCallback, useEffect, useMemo, useState } from "react"
import { io } from 'socket.io-client'
import API from "../utils/fetch.utils"

// Components
import { ContactsNavbar } from "../components/ContactNavbar/ChatsNavbar"
import { MessageInput } from "../components/Message/MessageInput"

import { Header } from "../components/Home/Header"
import { ChatWindow } from "../components/Home/ChatWindow"

// Interfaces
import { Chat } from "../interfaces/IChat.interface"
import { ReceivedMessage } from "../interfaces/IReceivedMessage.interface"

// const socket = io('http://localhost:3000', {auth: {token}})

function Home() {
    const token = useMemo(() => localStorage.getItem('token') || '', [])
    const socket = useMemo(() => io('http://localhost:3000', {auth: {token}}), [])

    const [chats, setChats] = useState<Chat>({})
    const [activeChatName, setActiveChatName] = useState<string>('')
    const activeChat = useMemo(() => {
        for (const [_, item] of Object.entries(chats)) {
            if (item.nickname === activeChatName) {
                return item
            } else if (item.username === activeChatName) {
                return item
            }
        }
        return undefined
    }, [activeChatName, chats])
    const chatNames = useMemo(() => {
        const names: string[] = []
        for (const [_,item] of Object.entries(chats)) {
            names.push(item.nickname || item.username)
        }
        // console.log(chats)
        return names
    }, [chats])

    useEffect(() => {
        initSocketListeners()
        getUserChats()
        // eslint-disable-next-line
    }, [])

    async function getUserChats() {
        const api = new API('http://localhost:3000/api/chats', "GET", undefined, token)
        try {
            const res = await api.fetch()
            const data = await res.json().catch(() => ({}))
            if (!res.ok) {
                alert(`${data.message ||'Ocorreu um erro status:' + res.status}`)
                return
            }
            const chats: Chat = data.chats || {}
            setChats(chats)
        } catch (error) {
            console.error(error)
        }
    }
    function initSocketListeners() {
        socket.on('connect', () => {getUserChats();console.log('Socket connected!')})
        socket.on('connect_error', (msg) => console.log(msg))

        socket.on('message:received', (data) => {receiveMessage(data)})
        socket.on('chatHasBeenUpdated', (chats: Chat) => {console.log(chats); setChats(chats)})
    }

    function receiveMessage(data: ReceivedMessage) {
        setChats((prevChats) => {
            console.log(prevChats)
            console.log('id', data.from)
            if (!prevChats[data.from]) return prevChats

            return {
                ...prevChats,
                [data.from]: {
                    ...prevChats[data.from],
                    messages: [
                        ...(prevChats[data.from]?.messages || []),
                        { message: data.message, isOwner: false, messageId: crypto.randomUUID() }
                    ]
                }
            };
        });
    }

    function sendMessage(message: string) {
        if (!message || !message.trim()) return
        socket.emit('message:sended', {receivedId: activeChat?._id, message })
        setChats((prevChats) => {
            if (!activeChat) return prevChats
            return {
                ...prevChats,
                [activeChat._id]: {
                    ...activeChat,
                    messages: [
                        ...(prevChats[activeChat._id]?.messages || []),
                        { message, isOwner: true, messageId: crypto.randomUUID() }
                    ]
                }
            };
        });
    }
    return (
        <main className="h-1/2 w-6xl bg-zinc-900 rounded-md flex z-10 shadow-md">
            <ContactsNavbar chats={chatNames} setActiveWindow={setActiveChatName} />
            <section className="w-full h-full p-1 flex flex-col">
                <Header nickname={activeChat?.nickname || activeChat?.username} />
                <ChatWindow messages={activeChat?.messages} />
                <MessageInput sendMessage={sendMessage} haveActiveChat={activeChat ? true : false} />
            </section>
        </main>
    )
}

export { Home }







