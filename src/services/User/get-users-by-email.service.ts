import { API } from "../../utils/fetch.utils";
import { TOKEN } from "../../utils/token.utils";

interface Data {
    success: boolean
    users: Array<{username: string, email:string}>
}

const token = TOKEN.get()

async function getUserByEmail(email: string) {
    const [res, data] = await API.get<Data>(`/api/users/search?email=${email}`, token)
    if (!res.ok) {
        throw new Error('Ocorreu um erro no servidor')
    }
    return data.users
}

export {getUserByEmail}