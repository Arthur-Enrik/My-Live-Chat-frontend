class TOKEN {
    static set = (newToken: string) => {
        if (!newToken) return
        localStorage.removeItem('token')
        localStorage.setItem('token', newToken)
    }
    static get = () => {
        const token = localStorage.getItem('token') || ''
        return token
    }
    static remove = () => {
        localStorage.removeItem('token')
    }
}

export {TOKEN}