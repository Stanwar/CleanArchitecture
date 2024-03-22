import { signal } from "@angular/core";
import { FieldTemplate } from "../baseTemplates/FieldTemplate";
import { RecordInstance } from "./RecordInstance";

export class FieldInstance {
    // Field instance value will be updated by the ngModel
    value = signal<string>('');
    fieldInstanceID: number = 0;
    // Reference to the template
    readonly fieldTemplate: FieldTemplate;    
    // Reference to the record
    readonly recordInstance!: RecordInstance;
    //#region  List of fields that depend on this field
    dependencies: FieldInstance[] = [];
    // List of fields that use this field inside mirror logic
    mirrorDependencies: FieldInstance[] = [];
    //#endregion

    //#region ngModel onChange event handler
    updateValue(value: string) {
        // Validate whether the field value is template valid
        const isValid = this.fieldTemplate.validate(this);
        if (isValid){
            // Update itself
            this.value.set(value);

            const fieldMirrorDependencies = this.fieldTemplate.getMirrorDependencies(); 
            // Update mirror dependencies
            fieldMirrorDependencies?.forEach((fieldTemplate) => {
                const fieldInstance = this.recordInstance.getFieldInstance(fieldTemplate.fieldSystemName);
                if (fieldInstance){
                    fieldInstance.updateValue(value);
                }
            });

            // Update dependencies
            const fieldDependencies = this.fieldTemplate.getDependencies();
            fieldDependencies?.forEach((fieldId) => {
                // This may not work because we can have multiple field instances with the same fieldId.
                const dependentFieldInstance = this.recordInstance.getFieldInstance(fieldId.toString());
                if (dependentFieldInstance){
                    // Ask fieldInstance to validate dependencies
                    dependentFieldInstance.checkDependencies();
                }
            });
            // this.dependencies.forEach((fieldInstance) => {
            //     fieldInstance.updateValue(value);
            // });
        }
        else {
            console.debug('FieldInstance.updateValue: Validation failed');
        }
    }

    checkDependencies(){
        // Check dependencies and update show and hide and might have to clear value
        // is field visible?
        // not visible, ignore
        // if field is visible, check if the dependencies are met. 
        // if not met, clear value. 
        // if met, do nothing
        // Run dependencies on the current field
        const fieldDependencies = this.fieldTemplate.getDependencies();
        fieldDependencies?.forEach((fieldId) => {
            // This may not work because we can have multiple field instances with the same fieldId.
            const dependentFieldInstance = this.recordInstance.getFieldInstance(fieldId.toString());
            if (dependentFieldInstance){
                // Ask fieldInstance to validate dependencies
                dependentFieldInstance.checkDependencies();
            }
        });
    }
    //#endregion
    constructor(value: string, fieldInstanceID: number, fieldTemplate: FieldTemplate, recordInstance: RecordInstance) {
        this.value = signal(value);
        this.fieldInstanceID = fieldInstanceID;
        this.fieldTemplate = fieldTemplate;
        this.recordInstance = recordInstance;
    }
}