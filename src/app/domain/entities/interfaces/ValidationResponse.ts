export class ValidationResponse {
    private isValidValue: boolean;
    private validationMessage: string;

    constructor(isValid: boolean, message: string) {
        this.isValidValue = isValid;
        this.validationMessage = message;
    }

    public setValidationValue(isValid: boolean): void {
        this.isValidValue = isValid;
    }
    public isValid(): boolean {
        return this.isValidValue;
    }

    public message(): string {
        return this.validationMessage;
    }
}