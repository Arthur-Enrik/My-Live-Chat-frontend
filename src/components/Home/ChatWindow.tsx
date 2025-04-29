import { Message } from "../Message/Message"

interface Props {
    messages?: Array<{message: string, isOwner: boolean, id: string}>
}

function ChatWindow({messages}: Props) {
    return (
        <section className="w-full h-full p-1 overflow-y-auto flex flex-col">
            {messages && messages.map(message => <Message message={message.message} isOwner={message.isOwner} key={message.id} />)}
        </section>
    )
}

export {ChatWindow}