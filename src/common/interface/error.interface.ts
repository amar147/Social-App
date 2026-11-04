export interface IError extends Error{
    status:number
}

export interface ICustomErrorOptions extends ErrorOptions {
  details?: unknown;
}
