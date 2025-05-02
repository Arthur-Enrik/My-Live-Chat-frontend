export interface BaseResponse {
    success: boolean
    message: string
    details?: Array<string>
}