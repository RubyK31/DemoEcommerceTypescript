// GlobalValidator.ts

export enum ErrorCode {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003,
    ADDRESS_NOT_FOUND = 1004,
    ADDRESS_DOES_NOT_BELONG = 1005,
    UNPROCESSABLE_ENTITY = 2001,
    INTERNAL_EXCEPTION = 3001,
    UNAUTHORISED = 4001,
    PRODUCT_NOT_FOUND = 5001,
    ORDER_NOT_FOUND = 6001
}

// Base exception class
export class HttpException extends Error {
    message: string;
    errorCode: ErrorCode | number;
    statusCode: number;
    errors: any;

    constructor(message: string, errorCode: ErrorCode | number, statusCode: number, errors: any) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

// Derived exception classes
export class BadRequestsException extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 400, null);
    }
}

export class InternalException extends HttpException {
    constructor(message: string, errors: any, errorCode: number) {
        super(message, errorCode, 500, errors);
    }
}

export class NotFoundException extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 404, null);
    }
}

export class UnauthorisedException extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 401, null);
    }
}

export class UnprocessableEntityException extends HttpException {
    constructor(error: any, message: string, errorCode: number) {
        super(message, errorCode, 422, error);
    }
}
