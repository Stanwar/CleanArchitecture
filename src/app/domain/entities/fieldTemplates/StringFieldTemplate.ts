import { DatalistTemplate } from "../baseTemplates/DatalistTemplate";
import { FieldDependency } from "../baseTemplates/FieldDependency";
import { FieldTemplate } from "../baseTemplates/FieldTemplate";
import { FieldInstance } from "../models/FieldInstance";

export class StringFieldTemplate extends FieldTemplate {
    // Define string specific properties like validators
    constructor(fieldId: number, fieldSystemName: string, fieldLabel: string, datalist: DatalistTemplate, defaultValue: string) {
        super(fieldId, fieldSystemName, fieldLabel, datalist, defaultValue);
    }
    override validate(fieldInstance: FieldInstance): boolean {
        if (!(fieldInstance.fieldTemplate instanceof StringFieldTemplate)){
            console.debug('FieldTemplate.validate: fieldInstance.fieldTemplate is not a FieldTemplate');
            return false;
        }
        let validationStatus = true;
        // Property level validations
        validationStatus = this.runValidations();

        // TODO: Is this necessary?
        if (validationStatus && fieldInstance.mirrorDependencies.length > 0){
            validationStatus = this.runMirrorDependencyLogic(fieldInstance);
        }

        if (validationStatus && fieldInstance.dependencies.length > 0){
            validationStatus = this.runDependencyLogic(fieldInstance);
        }
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

    // We will confirm if the mirror dependencies are updated
    private runMirrorDependencyLogic(fieldInstance: FieldInstance) : boolean {
        
        return true;
    }

    private runDependencyLogic(fieldInstance: FieldInstance) : boolean{
        // To be implemented
        // this.visibilityDependencies.forEach((fieldDependency) => {
        //     // Logic to update visibility
        // });


        return true;
    }
}