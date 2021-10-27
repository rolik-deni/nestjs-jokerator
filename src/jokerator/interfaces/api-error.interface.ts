/**
 * Api error interface
 */
export default interface ApiError {
    error: true
    internalError: boolean
    code: number
    message: string
    causedBy: string[]
    additionalInfo: string
    timestamp: number
}
