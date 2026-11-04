"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationExceptions = void 0;
class ApplicationExceptions extends Error {
    status;
    constructor(message, status, options) {
        super(message, options);
        this.status = status;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ApplicationExceptions = ApplicationExceptions;
