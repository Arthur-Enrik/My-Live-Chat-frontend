import { API } from "../../utils/fetch.utils";
import { TOKEN } from "../../utils/token.utils";

interface LoginResponse {
    success: boolean
    message: string
    token: string
    details?: string[]
    user: {
        _id: string
        username: string
    }
}

async function loginUser(email: string, password: string) {
    const [res, data] = await API.post<LoginResponse>('/api/users/auth', {email, password})

    if (!data.success) throw new Error(data.message || `Status: ${res.status}`)

    TOKEN.set(data.token)
    return data.message
}

export {loginUser}