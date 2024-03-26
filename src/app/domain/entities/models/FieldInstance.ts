import { computed, signal } from "@angular/core";
import { FieldTemplate } from "../baseTemplates/FieldTemplate";
import { RecordInstance } from "./RecordInstance";

export class FieldInstance {
    // Field instance value will be updated by the ngModel
    value = signal<string>('');
    fieldInstanceID: number = 0;
    // Reference to the template
    readonly fieldTemplate: FieldTemplate;    
    // Reference to the record
    recordInstance!: RecordInstance;
    //#region  List of fields that depend on this field
    dependencies: FieldInstance[] = [];
    //#endregion

    hidden = computed(() => {
        // Update this field instance value
        let matched = false;
        this.dependencies?.forEach((fieldInstance) => {
            const fieldInstanceValue = fieldInstance.value();
            if (this.fieldTemplate.getVisibilityDependency()?.allDependenciesMustPass){
                this.fieldTemplate.getVisibilityDependency()?.dependencies.every((fieldDependency) => {
                    if (fieldDependency.type === 'Equals' && fieldDependency.value === fieldInstanceValue){
                        matched = true;
                    }
                    else {
                        matched = false;
                    }
                });
            }
            else {
                this.fieldTemplate.getVisibilityDependency()?.dependencies.some((fieldDependency) => {
                    if (fieldDependency.type === 'Equals' && fieldDependency.value === fieldInstanceValue){
                        matched = true;
                    }
                    else {
                        matched = false;
                    }
                });
            }
        });

        return matched;
        if (this.fieldTemplate.getVisibilityDependency()?.allDependenciesMustPass){
            matched = this.fieldTemplate.getVisibilityDependency()?.dependencies.every((fieldDependency) => {
                // Convert to map
                const dependentOnFieldInstance = this.dependencies.find(f => f.fieldTemplate.fieldId === fieldDependency.dependentOnFieldID);
                if (dependentOnFieldInstance){
                    if (fieldDependency.type === 'Equals' && fieldDependency.value === dependentOnFieldInstance.value()){
                        return true;
                    }
                    return false;
                }
                return false;
            }) as boolean;
        }
        else {
            matched = this.fieldTemplate.getVisibilityDependency()?.dependencies.some((fieldDependency) => {
                // Convert to map
                const dependentOnFieldInstance = this.dependencies.find(f => f.fieldTemplate.fieldId === fieldDependency.dependentOnFieldID);
                if (dependentOnFieldInstance){
                    if (fieldDependency.type === 'Equals' && fieldDependency.value === dependentOnFieldInstance.value()){
                        return true;
                    }
                    return false;
                }
                return false;
            }) as boolean;
        }
        return matched;
    });
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
    constructor(value: string, fieldInstanceID: number, fieldTemplate: FieldTemplate) {
        this.value = signal(value);
        this.fieldInstanceID = fieldInstanceID;
        this.fieldTemplate = fieldTemplate;
    }
    
    setRecordInstance(recordInstance: RecordInstance): RecordInstance {
        this.recordInstance = recordInstance;        
        this.getVisibilityInstances();
        return recordInstance;
    }

    getVisibilityInstances(): void {
        // Get the field template
        const fieldTemplate = this.fieldTemplate;
        // Get the dependencies
        const dependencies = fieldTemplate.dependentOnFields;
        // Get the record instance
        const recordInstance = this.recordInstance;
        // Get the record fields
        const recordFields = recordInstance.fields;
        // Loop through the dependencies
        dependencies.forEach((dependency) => {
            // Find the field instance
            const fieldInstance = recordFields.find(f => f.fieldTemplate.fieldSystemName === dependency.fieldSystemName);
            // If the field instance is found, add it to the dependencies
            if (fieldInstance){
                this.dependencies.push(fieldInstance);
            }
        });
    }
}