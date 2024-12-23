export declare enum ErrorCode {
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
export declare class HttpException extends Error {
    message: string;
    errorCode: ErrorCode | number;
    statusCode: number;
    errors: any;
    constructor(message: string, errorCode: ErrorCode | number, statusCode: number, errors: any);
}
export declare class BadRequestsException extends HttpException {
    constructor(message: string, errorCode: ErrorCode);
}
export declare class InternalException extends HttpException {
    constructor(message: string, errors: any, errorCode: number);
}
export declare class NotFoundException extends HttpException {
    constructor(message: string, errorCode: ErrorCode);
}
export declare class UnauthorisedException extends HttpException {
    constructor(message: string, errorCode: ErrorCode);
}
export declare class UnprocessableEntityException extends HttpException {
    constructor(error: any, message: string, errorCode: number);
}
