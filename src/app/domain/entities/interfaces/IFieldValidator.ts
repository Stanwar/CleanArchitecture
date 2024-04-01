import { FieldInstance } from "../models/FieldInstance";
import { ValidationResponse } from "./ValidationResponse";

export interface IFieldValidator {
    validationResponses: ValidationResponse[];

    validate(fieldInstance: FieldInstance): ValidationResponse[];

    setValidationResponse(validationResponse: ValidationResponse): void;

    getValidationResponses(): ValidationResponse[];

    clearValidationResponses(): void;
}