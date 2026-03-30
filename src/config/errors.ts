export class ContextError extends Error {
    constructor(hookName: string, providerName: string) {
        super(`[Context Error]: ${hookName} must be used within a ${providerName}`)
        this.name = "ContextError"
    }
}
