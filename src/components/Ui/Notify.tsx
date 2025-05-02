export type Type = 'WARN' | 'ALERT' | 'ERR'
 
interface Props {
    notifyType: Type
    message: string
}

function Notify({notifyType, message}: Props) {
    
    const NotifyTypes = {
        WARN: 'bg-yellow-400',
        ALERT: 'bg-white',
        ERR: 'bg-red-400',
    }

    return (
        <div className={`w-fit h-fit p-2 rounded-md flex justify-center items-center fixed text-black top-2 font-bold ${NotifyTypes[notifyType]}`} style={{ left: '50%', transform: 'translateX(-50%)' }}>
            <p>{message}</p>
        </div>
    )
}

export {Notify}