import { FieldInstance } from "../models/FieldInstance";
import { IValidator } from "./IValidator";
import { ValidationResponse } from "./ValidationResponse";

export class MinLengthValidator implements IValidator{
    private minLength: number;
    private validationMessage: string = 'Length is less than minimum';
    validationResponse: ValidationResponse;
    constructor(minLength: number, message?: string) {
        this.minLength = minLength;
        this.validationMessage = message || this.validationMessage;
        this.validationResponse = new ValidationResponse(false, this.validationMessage);
    }

    validate(fieldInstance: FieldInstance): ValidationResponse {
        const isValid = fieldInstance.value()?.length >= this.minLength;
        this.validationResponse.setValidationValue(isValid);
        return this.validationResponse;
    }
}