export class ApplicationExceptions extends Error {
    constructor(message?:string ,public status?:number, options?:ErrorOptions ){
        super(message ,options )
        this.name=this.constructor.name
        Error.captureStackTrace(this ,this.constructor)
    }
}