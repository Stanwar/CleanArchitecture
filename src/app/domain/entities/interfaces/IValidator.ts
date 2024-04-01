import { FieldInstance } from "../models/FieldInstance";
import { ValidationResponse } from "./ValidationResponse";

export interface IValidator {
    validationResponse: ValidationResponse;
    // Async?
    validate(fieldInstance: FieldInstance): ValidationResponse;
}