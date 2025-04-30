import {FormEvent, useState} from 'react'
import {SendHorizontal} from 'lucide-react'

interface Props {
    sendMessage: (message: string) => void
    haveActiveChat: boolean
}

function MessageInput({sendMessage, haveActiveChat}: Props) {
    const [message, setMessage] = useState<string>('')
    function submitHandler(event: FormEvent) {
        event.preventDefault()
        sendMessage(message)
        setMessage('')
    }
    return(
    <form onSubmit={submitHandler} className='flex h-fit w-full gap-1 bg-zinc-800 text-white rounded-md mt-auto'>
        <input value={message} readOnly={haveActiveChat ? false : true} onChange={e => {setMessage(e.target.value)}} type="text" className='w-full h-10 rounded-md p-2 outline-none' />
        <button className='flex h-10 w-1/8 rounded-sm justify-center items-center gap-1 hover:bg-white/10 hover:cursor-pointer'>enviar <SendHorizontal /></button>
    </form> 
    )

}

export {MessageInput}