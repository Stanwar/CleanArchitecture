import { FieldTemplate } from "../baseTemplates/FieldTemplate";
import { StringFieldInstance } from "../models/FieldModels.ts/StringFieldInstance";

export class StringFieldTemplate extends FieldTemplate {
    // Define string specific properties like validators
    constructor(fieldId: number, fieldSystemName: string, fieldLabel: string, defaultValue: string) {
        super(fieldId, fieldSystemName, fieldLabel, defaultValue);
    }
    override validate(fieldInstance: StringFieldInstance): boolean {
        if (!(fieldInstance.fieldTemplate instanceof StringFieldTemplate)){
            console.debug('FieldTemplate.validate: fieldInstance.fieldTemplate is not a FieldTemplate');
            return false;
        }
        let validationStatus = true;
        // Property level validations
        validationStatus = this.runValidations();
        // Object level validations
        // Custom validations
        return validationStatus;
    }

    // These will be the validation options for the string field
    private runValidations(): boolean {
        let validationStatus = true;
        for (let validator of this.validators){
            // if (!validator.validate()){
            //     validationStatus = false;
            //     break;
            // }
        }
        return validationStatus;
    }
}