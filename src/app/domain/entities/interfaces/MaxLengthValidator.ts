import { FieldInstance } from "../models/FieldInstance";
import { IValidator } from "./IValidator";
import { ValidationResponse } from "./ValidationResponse";

export class MaxLengthValidator implements IValidator{
    private maxLength: number;

    constructor(maxLength: number) {
        this.maxLength = maxLength;
    }
    validationResponse: ValidationResponse = new ValidationResponse(true, "Length is greater than maximum");
    validate(fieldInstance: FieldInstance): ValidationResponse {
        const isValid = fieldInstance.value()?.length < this.maxLength;
        this.validationResponse.setValidationValue(isValid);
        return this.validationResponse;
    }
}