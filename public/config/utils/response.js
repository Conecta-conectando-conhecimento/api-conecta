"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseOn = void 0;
class ResponseOn {
    success(data, codehttp) {
        return {
            status: true,
            data,
            error: null,
            codehttp,
        };
    }
    error(error, codehttp = 500) {
        console.log(error);
        return {
            status: false,
            data: null,
            error,
            codehttp,
        };
    }
}
exports.ResponseOn = ResponseOn;
