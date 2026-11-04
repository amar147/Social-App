import { ICustomErrorOptions } from "../interface";
import { ApplicationExceptions } from "./main.exceptions";

export class NotFoundException extends ApplicationExceptions {
    constructor(message:string = "User Not Found", options?:ICustomErrorOptions){
        super(message ,404, options )
    }
}


export class BadRequestException extends ApplicationExceptions {
    constructor(message: string = "Bad Request", options?: ICustomErrorOptions) {
    super(message, 400, options);
    }
}

export class UnauthorizedException extends ApplicationExceptions {
    constructor(message: string = "Unauthorized", options?: ICustomErrorOptions) {
    super(message, 401, options);
    }
}

export class ForbiddenException extends ApplicationExceptions {
    constructor(message: string = "Forbidden Resource", options?: ICustomErrorOptions) {
    super(message, 403, options);
    }
}



export class ConflictException extends ApplicationExceptions {
    constructor(message: string = "Resource Already Exists", options?: ICustomErrorOptions) {
    super(message, 409, options);
    }
}

export class UnprocessableEntityException extends ApplicationExceptions {
    constructor(message: string = "Validation Failed", options?: ICustomErrorOptions) {
    super(message, 422, options);
    }
}

export class InternalServerErrorException extends ApplicationExceptions {
    constructor(message: string = "Internal Server Error", options?: ICustomErrorOptions) {
    super(message, 500, options);
}
}