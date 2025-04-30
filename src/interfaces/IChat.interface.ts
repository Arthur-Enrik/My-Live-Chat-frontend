import { IMessage } from "./IMessage.interface"

export interface Chat {
    [_id: string]: {
        _id: string
        username: string
        nickname: string
        messages: Array<IMessage>
    }
}