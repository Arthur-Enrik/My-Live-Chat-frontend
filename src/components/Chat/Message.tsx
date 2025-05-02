interface Props {
    message: string
    isOwner: boolean
}

function Message({message, isOwner}: Props) {
    return(
        <div className={`bg-zinc-200 w-fit max-w-1/2 p-2 mt-1 rounded-md ${isOwner ? 'self-end' : 'self-start' }`}>
            <p className="w-full">
                {message}
            </p>
        </div>
    )
}

export {Message}