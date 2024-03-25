import { effect, computed, signal } from "@angular/core";
import { MirrorFieldTemplate } from "../../fieldTemplates/MirrorFieldTemplate";
import { FieldInstance } from "../FieldInstance";
import { RecordInstance } from "../RecordInstance";

export class MirrorFieldInstance extends FieldInstance {
    override fieldTemplate: MirrorFieldTemplate;
    mirrorNewValue = computed(() => {
        if (this.valueDependencies.length === 0){
            return this.value() || '';
        }
        let newValue = '';
        this.valueDependencies.forEach((fieldInstance) => {
            // Add this field instance to the field instance's dependencies
            console.log('A dependency has changed');
            const val = fieldInstance.value();
            // Needs to maybe have a mirror default value to replace the value with
            newValue += val;
        });
        // Cannot set a value for a signal instead a computed signal
        // this.updateValue(newValue);
        return newValue;
    });

    // List of fields that use this field inside mirror logic
    valueDependencies: FieldInstance[] = [];

    constructor(value: string, fieldInstanceID: number, fieldTemplate: MirrorFieldTemplate, recordInstance: RecordInstance) {
        super(value, fieldInstanceID, fieldTemplate, recordInstance);
        this.fieldTemplate = fieldTemplate;
        // Determine the mirror dependencies.
        this.setupDependencies();
    }

    // We will override the updateValue method to handle mirror logic
    override updateValue(value: string): void {
        // Apply mirror rules.
        this.value.set(value);
    }

    setupDependencies(): void {
        // Get the field template
        const mirrorFieldTemplate = this.fieldTemplate;
        // Get the mirror dependencies
        const mirrorDependencies = mirrorFieldTemplate.mirrorDependencies;
        // Get the record instance
        const recordInstance = this.recordInstance;
        // Get the record fields
        const recordFields = recordInstance.fields;
        // Loop through the mirror dependencies
        mirrorDependencies.forEach((mirrorDependency) => {
            // Find the field instance
            const fieldInstance = recordFields.find(f => f.fieldTemplate.fieldSystemName === mirrorDependency.fieldSystemName);
            // If the field instance is found, add it to the value dependencies
            if (fieldInstance){
                this.valueDependencies.push(fieldInstance);
            }
        });
        // Loop through the value dependencies and update mirror template value if dependentOn field's value changes. 
        // this.valueDependencies.forEach((fieldInstance) => {
        //     // Add this field instance to the field instance's dependencies
        //     effect(() => {
        //         console.log('A dependency has changed');
        //         const val = fieldInstance.value();
        //         this.updateValue(val);
        //     }, {
        //         allowSignalWrites: true
        //     });
        // })
    }
}