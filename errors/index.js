class ServerError extends Error {
    constructor(message, httpStatus) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.httpStatus = httpStatus;
        // capturam stacktrace-ul si in obiectul nostru
        // il injectam in constructor
        Error.captureStackTrace(this, this.constructor);
    }
};

// facem clasa publica
module.exports = {
    ServerError
}
