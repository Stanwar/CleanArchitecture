import { FieldTemplate } from "../baseTemplates/FieldTemplate";
import { MaxValidator } from "../interfaces/MaxValidator";
import { MinValidator } from "../interfaces/MinValidator";
import { RequiredValidator } from "../interfaces/RequiredValidator";
import { ValidationResponse } from "../interfaces/ValidationResponse";
import { FieldInstance } from "../models/FieldInstance";
import { StringFieldInstance } from "../models/FieldModels.ts/StringFieldInstance";

export class StringFieldTemplate extends FieldTemplate{
    // Define string specific properties like validators
    constructor(fieldId: number, fieldSystemName: string, fieldLabel: string, defaultValue: string) {
        super(fieldId, fieldSystemName, fieldLabel, defaultValue);
        this.setupValidators();
    }
    
    override validate(fieldInstance: FieldInstance): ValidationResponse[] {
        this.validationResponses = [];
        if (!(fieldInstance instanceof StringFieldInstance)){
            console.debug('StringFieldInstance.validate: the fieldInstance is not a StringFieldInstance');
            this.validationResponses.push(new ValidationResponse(false, 'The fieldInstance is not a StringFieldInstance'));
        }

        if (!(fieldInstance.fieldTemplate instanceof StringFieldTemplate)){
            console.debug('FieldTemplate.validate: fieldInstance.fieldTemplate is not a FieldTemplate');
            this.validationResponses.push(new ValidationResponse(false, 'The fieldInstance is not a StringFieldInstance'));
        }
        // Short circuit 
        if (this.validationResponses.length > 0){
            return this.validationResponses;
        }

        this.runValidations(fieldInstance);
        // Object level validations
        // Custom validations
        return this.validationResponses;
    }

    // These will be the validation options for the string field
    runValidations(fieldInstance: FieldInstance): void {
        let validationStatus = true;
        for (let validator of this.validators){
            this.validationResponses.push(validator.validate(fieldInstance));
        }
    }

    setupValidators(): void {
        // Go over template and add validators. 
        if (this.required){
            // this.validators.push(new RequiredValidator());
            this.validators.push(new RequiredValidator())
        }

        if (this.options?.length > 0){
            this.options?.forEach((option) => {
                if (option.optionName == 'minLength'){
                    // Add extra validations
                    this.validators.push(new MinValidator(parseInt(option.optionValue)));
                }
                else if (option.optionName == 'maxLength'){
                    // Add extra validations
                    // Maybe create methods?
                    this.validators.push(new MaxValidator(parseInt(option.optionValue)));
                }
            });
        }
    }
}