import { API } from "../../utils/fetch.utils";

// Interfaces
import { BaseResponse } from "../../interfaces/IBaseResponse";

async function getChat(token:string) {

    const [res, data] = await API.get<BaseResponse>("/api/chats", token)
    
    if (!res.ok) throw new Error(data.message || `Status: ${res.status}`)
    if (!data.success) throw new Error(data.message || `Status: ${res.status}`)
    
    return data
        
}

export {getChat}