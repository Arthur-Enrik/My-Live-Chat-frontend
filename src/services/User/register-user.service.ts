import { API } from "../../utils/fetch.utils";

interface RegisterResponse {
    success: boolean
    message: string
    details?: string[]
}

async function registerUser(username: string, email: string, password: string) {
    const [res, data] = await API.post<RegisterResponse>('/api/users/register', {username, email, password})

    if (!res.ok) {throw new Error(data.message || `status: ${res.status}`)}
    if (!data.success) {throw new Error(data.message || `Status: ${res.status}`)}
}

export {registerUser}