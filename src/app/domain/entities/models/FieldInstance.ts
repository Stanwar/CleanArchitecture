import { computed, signal } from "@angular/core";
import { FieldTemplate } from "../baseTemplates/FieldTemplate";
import { RecordInstance } from "./RecordInstance";
import { mCaseUtilityService } from "../../../services/MCaseUtilityService";

export class FieldInstance {
    // Field instance value will be updated by the ngModel
    value = signal<any>('');
    fieldInstanceID: number = 0;
    // Reference to the template
    readonly fieldTemplate: FieldTemplate;
    // Reference to the record
    recordInstance!: RecordInstance;
    //#region  List of fields that depend on this field
    visibilityDependencyInstances: FieldInstance[] = [];
    conditionallyMandatoryInstances: FieldInstance[] = [];
    //#endregion
    //#region Computed properties
    conditionallyMandatory = computed(() => {
        if (this.fieldTemplate.required){
            return true;
        }
        // Check conditionally mandatory validation
        const returnValue = this.fieldTemplate.checkIfFieldIsConditionallyMandatory(this.getConditionallyMandatoryInstances());
        return returnValue;
    });

    // Check if parent is hidden
    // Then check if all the visibility dependencies are met
    hidden = computed(() => {
        const runVisibilityDependencies = this.fieldTemplate.checkIfFieldIsHidden(this.parentFieldInstance(), this.getVisibilityInstances());

        return runVisibilityDependencies;
    });
    // Run visibility dependencies
    disabled = computed(() => {
        // Should this check parent value too?
        const returnValue = this.fieldTemplate.checkIfFieldIsDisabled(this.getVisibilityInstances());
        return returnValue;
    });

    parentFieldInstance = computed(() => {
        return this.recordInstance.getFieldByID(this.fieldTemplate.parentFieldID());
    });
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
    constructor(mCaseService: mCaseUtilityService, value: string, fieldInstanceID: number = 0, fieldTemplate: FieldTemplate) {
        this.fieldInstanceID = fieldInstanceID > 0 ? fieldInstanceID : mCaseService.generateID();
        this.fieldTemplate = fieldTemplate;
        this.applyDefaultValueIfNeeded(value);
    }
    
    applyDefaultValueIfNeeded(value: String) {
        this.value = value ? signal(value) : signal(this.fieldTemplate.defaultValue);
    }
    /**
     * Sets the record instance for this field instance and retrieves the visibility dependency instances.
     * @param recordInstance The record instance to set.
     * @returns The updated record instance.
     */
    setRecordInstance(recordInstance: RecordInstance): RecordInstance {
        this.recordInstance = recordInstance;        
        // this.getVisibilityInstances();  
        this.getConditionallyMandatoryInstances();
        return recordInstance;
    }

    /**
     * Retrieves the field instances that are dependencies for the visibility of this field instance.
     * @returns An array of field instances that are dependencies for the visibility of this field instance.
     */
    getVisibilityInstances(): FieldInstance[] {
        if (this.visibilityDependencyInstances.length > 0){
            return this.visibilityDependencyInstances;
        }
        // Get the field template
        const fieldTemplate = this.fieldTemplate;
        // Get the dependencies
        const dependencies = fieldTemplate.dependentOnFields;
        // Get the record instance
        const recordInstance = this.recordInstance;
        // Loop through the dependencies
        dependencies.forEach((dependency) => {
            // Find the field instance
            const fieldInstance = recordInstance.getFieldBySystemName(dependency.fieldSystemName);
            // If the field instance is found, add it to the dependencies
            if (fieldInstance){
                this.visibilityDependencyInstances.push(fieldInstance);
            }
        });

        return this.visibilityDependencyInstances;
    }

    getConditionallyMandatoryInstances(): FieldInstance[] {
        // Get the field template
        const fieldTemplate = this.fieldTemplate;
        // Get the dependencies
        const conditionalDependencies = fieldTemplate.conditionallyMandatoryOnFields;
        // Get the record instance
        const recordInstance = this.recordInstance;
        // Loop through the dependencies
        conditionalDependencies.forEach((dependency) => {
            // Find the field instance
            const fieldInstance = recordInstance.getFieldBySystemName(dependency.fieldSystemName);
            // If the field instance is found, add it to the dependencies
            if (fieldInstance){
                this.conditionallyMandatoryInstances.push(fieldInstance);
            }
        });
        return this.conditionallyMandatoryInstances;
    }
}