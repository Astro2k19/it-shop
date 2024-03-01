export interface ApiError {
    message: string
    statusCode: number
    stack?: string
}