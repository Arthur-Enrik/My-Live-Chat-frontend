import { useEffect, useRef } from "react"

import { Message } from "./Message"
import { IMessage } from "../../interfaces/IMessage.interface"

interface Props {
    messages?: Array<IMessage>
}

function ChatWindow({ messages }: Props) {
    const endOfMessagesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        })
    }, [messages])

    return (
        <section className="w-full h-full p-1 overflow-y-auto flex flex-col"    >
            {messages && messages.map(message => <Message message={message.message} isOwner={message.isOwner} key={message.messageId} />)}
            <div ref={endOfMessagesRef} className="h-0 w-0" />
        </section>
    )
}

export { ChatWindow }