import { API } from "../../utils/fetch.utils"
import { TOKEN } from "../../utils/token.utils"

const token = TOKEN.get()

async function addUser(email: string) {
    const [res, data] = await API.post<{success: boolean, message: string}>('/api/chats', {email}, token)
    if (!data.success) throw new Error(data.message || `Status: ${res.status}`)

    return data.message
}

export {addUser}