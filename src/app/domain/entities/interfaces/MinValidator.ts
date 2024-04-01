import { FieldInstance } from "../models/FieldInstance";
import { IValidator } from "./IValidator";
import { ValidationResponse } from "./ValidationResponse";

export class MinValidator implements IValidator {
    private min: number;
    private validationMessage: string = "Value is less than minimum";
    validationResponse: ValidationResponse;
    
    constructor(min: number, message?: string) {
        this.min = min;
        this.validationMessage = message || this.validationMessage;
        this.validationResponse = new ValidationResponse(false, this.validationMessage);
    }

    validate(fieldInstance: FieldInstance): ValidationResponse {
        const isValid = fieldInstance.value() >= this.min;
        this.validationResponse.setValidationValue(isValid);
        return this.validationResponse;
    }
}