"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerErrorException = exports.UnprocessableEntityException = exports.ConflictException = exports.ForbiddenException = exports.UnauthorizedException = exports.BadRequestException = exports.NotFoundException = void 0;
const main_exceptions_1 = require("./main.exceptions");
class NotFoundException extends main_exceptions_1.ApplicationExceptions {
    constructor(message = "User Not Found", options) {
        super(message, 404, options);
    }
}
exports.NotFoundException = NotFoundException;
class BadRequestException extends main_exceptions_1.ApplicationExceptions {
    constructor(message = "Bad Request", options) {
        super(message, 400, options);
    }
}
exports.BadRequestException = BadRequestException;
class UnauthorizedException extends main_exceptions_1.ApplicationExceptions {
    constructor(message = "Unauthorized", options) {
        super(message, 401, options);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends main_exceptions_1.ApplicationExceptions {
    constructor(message = "Forbidden Resource", options) {
        super(message, 403, options);
    }
}
exports.ForbiddenException = ForbiddenException;
class ConflictException extends main_exceptions_1.ApplicationExceptions {
    constructor(message = "Resource Already Exists", options) {
        super(message, 409, options);
    }
}
exports.ConflictException = ConflictException;
class UnprocessableEntityException extends main_exceptions_1.ApplicationExceptions {
    constructor(message = "Validation Failed", options) {
        super(message, 422, options);
    }
}
exports.UnprocessableEntityException = UnprocessableEntityException;
class InternalServerErrorException extends main_exceptions_1.ApplicationExceptions {
    constructor(message = "Internal Server Error", options) {
        super(message, 500, options);
    }
}
exports.InternalServerErrorException = InternalServerErrorException;
