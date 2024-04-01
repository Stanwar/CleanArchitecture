import { MaxLengthValidator } from "../interfaces/MaxLengthValidator";
import { MinValidator } from "../interfaces/MinValidator";
import { RequiredValidator } from "../interfaces/RequiredValidator";
import { ValidationResponse } from "../interfaces/ValidationResponse";
import { FieldInstance } from "../models/FieldInstance";
import { SsnFieldInstance } from "../models/FieldModels.ts/SsnFieldInstance";
import { StringFieldTemplate } from "./StringFieldTemplate";

export class SsnFieldTemplate extends StringFieldTemplate {
    constructor(fieldId: number, fieldSystemName: string, fieldLabel: string, defaultValue: string) {
        super(fieldId, fieldSystemName, fieldLabel, defaultValue);
        this.setUpValidators();
    }
    
    override validate(fieldInstance: FieldInstance): ValidationResponse[] {
        this.validationResponses = [];
        if (!(fieldInstance instanceof SsnFieldInstance)){
            console.debug('StringFieldInstance.validate: the fieldInstance is not a SsnFieldInstance');
            this.validationResponses.push(new ValidationResponse(false, 'The fieldInstance is not a SsnFieldInstance'));
        }

        if (!(fieldInstance.fieldTemplate instanceof SsnFieldTemplate)){
            console.debug('FieldTemplate.validate: fieldInstance.fieldTemplate is not a SsnFieldTemplate');
            this.validationResponses.push(new ValidationResponse(false, 'The fieldInstance is not a SsnFieldTemplate'));
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

    setUpValidators() {
        // Add validators for SSN
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
            });
        }
        
        //Mandatory SSN Validation
        this.validators.push(new MaxLengthValidator(9));
    }
}