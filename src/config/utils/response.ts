export type ErrorTypes = string | unknown | null;

export type APIResponse<Data, Error> = {
    status: boolean;
    data: Data;
    error: Error;
    codehttp: number;
}

export class ResponseOn {
    success<Data>(data: Data, codehttp: number): APIResponse<Data, null> {
        return {
            status: true,
            data,
            error: null,
            codehttp,
        };
    }

    error<Error>(error: Error, codehttp: number = 500): APIResponse<null, Error> {
        console.log(error);
        return {
            status: false,
            data: null,
            error,
            codehttp,
        };
    }
}
