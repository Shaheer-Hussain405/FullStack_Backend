class apiError extends Error {
    constructor(
        statusCode,
        message = "Soething Went Wrong",
        errors = [],
        stack = "",
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.errors = errors
    }
}

export default apiError