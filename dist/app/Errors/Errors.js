"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationError = void 0;
exports.validationError = {
    error: {
        name: "ValidationError",
        errors: {
            copies: {
                message: "Copies must be a positive number",
                name: "ValidatorError",
                properties: {
                    message: "Copies must be a positive number",
                    type: "min",
                    min: 0
                },
                kind: "min",
                path: "copies",
                value: -5
            }
        }
    }
};
