import { API } from "../../utils/fetch.utils";

// Interfaces
import { BaseResponse } from "../../interfaces/IBaseResponse"; 

type Body = {email: string, nickname?: string}

async function addChat(email: string, token:string, nickname?: string) {
    const body: Body = {
        email
    }
    
    if (nickname) body.nickname = nickname

    const [res, data] = await API.post<BaseResponse>("/api/chats", body, token)

    if (!res.ok) throw new Error(data.message || `Status: ${res.status}`)
    if (!data.success) throw new Error(data.message || `Status: ${res.status}`)

    return data
    
}

export {addChat}