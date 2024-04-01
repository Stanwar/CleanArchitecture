import { FieldInstance } from "../models/FieldInstance";
import { IValidator } from "./IValidator";
import { ValidationResponse } from "./ValidationResponse";

export class MaxValidator implements IValidator {
    private max: number;
    private validationMessage: string = 'Number is greater than maximum';
    validationResponse: ValidationResponse;
    constructor(max: number, message?: string) {
        this.max = max;
        this.validationMessage = message || this.validationMessage;
        this.validationResponse = new ValidationResponse(false, this.validationMessage);
    }
    validate(fieldInstance: FieldInstance): ValidationResponse {
        const isValid = parseInt(fieldInstance.value()) <= this.max;
        this.validationResponse.setValidationValue(isValid);
        return this.validationResponse;
    }
}