import { FieldInstance } from "../models/FieldInstance";
import { IValidator } from "./IValidator";
import { ValidationResponse } from "./ValidationResponse";

export class RequiredValidator implements IValidator {
    validationResponse: ValidationResponse;
    validationMessage: string = 'The field is required';
    constructor(message?: string) {
        this.validationMessage = message || this.validationMessage;
        this.validationResponse = new ValidationResponse(true, this.validationMessage);
    }

    validate(fieldInstance: FieldInstance): ValidationResponse {
        if (fieldInstance.value() === null || fieldInstance.value() === undefined || fieldInstance.value() === '') {
            this.validationResponse.setValidationValue(false);
        }
        return this.validationResponse;
    }
}