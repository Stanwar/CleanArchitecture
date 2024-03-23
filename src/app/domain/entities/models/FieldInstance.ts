import { signal } from "@angular/core";
import { FieldTemplate } from "../baseTemplates/FieldTemplate";
import { RecordInstance } from "./RecordInstance";

// TODO: Specific type of field instance
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
    //#endregion

    //#region ngModel onChange event handler
    updateValue(value: string) {
        // Validate whether the field value is template valid
        const isValid = this.fieldTemplate.validate(this);
        if (isValid){
            // Update itself
            this.value.set(value);
        }
        else {
            console.debug('FieldInstance.updateValue: Validation failed');
        }
    }

    //#endregion
    constructor(value: string, fieldInstanceID: number, fieldTemplate: FieldTemplate, recordInstance: RecordInstance) {
        this.value = signal(value);
        this.fieldInstanceID = fieldInstanceID;
        this.fieldTemplate = fieldTemplate;
        this.recordInstance = recordInstance;
    }
}