type methods = 'POST' | 'GET' | 'PUT'

class API {
    private url: string
    private method: methods
    private body?: BodyInit
    private token?: string
    constructor(url:string, method: methods, body?: object, token?: string){
        this.url = url
        this.method = method
        this.body = body ? JSON.stringify(body) : undefined
        this.token = token
    }
    async fetch() {
        const options: RequestInit = {
            method: this.method,
            headers: genHeaders(this.token),
        }
        if (this.method !== 'GET' && this.body) {
            options.body = this.body
        }
        const res = await fetch(this.url, options)
        return res
    }
}

function genHeaders(token?: string): HeadersInit {
    if (token) {
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }        
    } else {
        return {
            'Content-Type': 'application/json'
        }   
    }
}

export default API