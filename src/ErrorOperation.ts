import { HTTPError } from "./HTTPError";

export class ErrorOperation
{
    static throwHTTP(code: number, message: string)
    {
        throw this.getHTTP(code, message);
    }
    static getHTTP(code: number, message: string)
    {
        return new HTTPError(code, message);
    }
}