export interface ApiErrorModel extends Error {
  message: string
  statusCode: number
  stack?: string
}
