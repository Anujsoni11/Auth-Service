const AppError = require('./error-handler');
const { StatusCodes } = require('http-status-code');

class ClientError extends AppError {
    constructor(name, message, explanation, statusCode) {
        super(
            name,
            explanation,
            message,
            statusCode
        );
    }
}

module.exports = ClientError;