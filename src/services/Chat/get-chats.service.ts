import { API } from "../../utils/fetch.utils";
import { TOKEN } from "../../utils/token.utils";

// Interfaces
import { BaseResponse } from "../../interfaces/IBaseResponse";
import { Chat } from "../../interfaces/IChat.interface";

const token = TOKEN.get()
console.log(token)

interface ChatResponse extends BaseResponse {
    chats: Chat
}

async function getChat() {
    const [res, data] = await API.get<ChatResponse>("/api/chats", token)
    
    if (!res.ok) throw new Error(data.message || `Status: ${res.status}`)
    if (!data.success) throw new Error(data.message || `Status: ${res.status}`)
    
    return data.chats
}

export {getChat}