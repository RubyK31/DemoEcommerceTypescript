"use strict";
// GlobalValidator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntityException = exports.UnauthorisedException = exports.NotFoundException = exports.InternalException = exports.BadRequestsException = exports.HttpException = exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["USER_NOT_FOUND"] = 1001] = "USER_NOT_FOUND";
    ErrorCode[ErrorCode["USER_ALREADY_EXISTS"] = 1002] = "USER_ALREADY_EXISTS";
    ErrorCode[ErrorCode["INCORRECT_PASSWORD"] = 1003] = "INCORRECT_PASSWORD";
    ErrorCode[ErrorCode["ADDRESS_NOT_FOUND"] = 1004] = "ADDRESS_NOT_FOUND";
    ErrorCode[ErrorCode["ADDRESS_DOES_NOT_BELONG"] = 1005] = "ADDRESS_DOES_NOT_BELONG";
    ErrorCode[ErrorCode["UNPROCESSABLE_ENTITY"] = 2001] = "UNPROCESSABLE_ENTITY";
    ErrorCode[ErrorCode["INTERNAL_EXCEPTION"] = 3001] = "INTERNAL_EXCEPTION";
    ErrorCode[ErrorCode["UNAUTHORISED"] = 4001] = "UNAUTHORISED";
    ErrorCode[ErrorCode["PRODUCT_NOT_FOUND"] = 5001] = "PRODUCT_NOT_FOUND";
    ErrorCode[ErrorCode["ORDER_NOT_FOUND"] = 6001] = "ORDER_NOT_FOUND";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
// Base exception class
class HttpException extends Error {
    constructor(message, errorCode, statusCode, errors) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
exports.HttpException = HttpException;
// Derived exception classes
class BadRequestsException extends HttpException {
    constructor(message, errorCode) {
        super(message, errorCode, 400, null);
    }
}
exports.BadRequestsException = BadRequestsException;
class InternalException extends HttpException {
    constructor(message, errors, errorCode) {
        super(message, errorCode, 500, errors);
    }
}
exports.InternalException = InternalException;
class NotFoundException extends HttpException {
    constructor(message, errorCode) {
        super(message, errorCode, 404, null);
    }
}
exports.NotFoundException = NotFoundException;
class UnauthorisedException extends HttpException {
    constructor(message, errorCode) {
        super(message, errorCode, 401, null);
    }
}
exports.UnauthorisedException = UnauthorisedException;
class UnprocessableEntityException extends HttpException {
    constructor(error, message, errorCode) {
        super(message, errorCode, 422, error);
    }
}
exports.UnprocessableEntityException = UnprocessableEntityException;
