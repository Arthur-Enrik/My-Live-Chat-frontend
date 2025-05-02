import { API } from "../../utils/fetch.utils";

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

    if (!res.ok) {throw new Error(data.message || `status: ${res.status}`)}
    if (!data.success) {throw new Error(data.message || `Status: ${res.status}`)}

    return data

}

export {loginUser}