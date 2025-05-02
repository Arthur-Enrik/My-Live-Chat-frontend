import {FormEvent, useState} from 'react'
import {SendHorizontal} from 'lucide-react'

function MessageInput() {

    return(
    <form className='flex h-fit w-full gap-1 bg-zinc-800 text-white rounded-md mt-auto'>
        <input type="text" className='w-full h-10 rounded-md p-2 outline-none' />
        <button className='flex h-10 w-1/8 rounded-sm justify-center items-center gap-1 hover:bg-white/10 hover:cursor-pointer'>enviar <SendHorizontal /></button>
    </form> 
    )

}

export {MessageInput}