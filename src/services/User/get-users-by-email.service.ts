import { API } from "../../utils/fetch.utils";

const users: Array<{email: string, username: string}> = [
    {email: 'arthur@gmail.com', username: 'Arthur'},
    {email: 'junior@gmail.com', username: 'Junior'},
    {email: 'luan@gmail.com', username: 'Luan'},
]

function getUserByEmail(email: string) {
    return users
}

export {getUserByEmail}