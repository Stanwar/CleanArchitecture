import { effect, computed, signal } from "@angular/core";
import { MirrorFieldTemplate } from "../../fieldTemplates/MirrorFieldTemplate";
import { FieldInstance } from "../FieldInstance";
import { RecordInstance } from "../RecordInstance";
import { mCaseUtilityService } from "../../../../services/MCaseUtilityService";

export class MirrorFieldInstance extends FieldInstance {
    override fieldTemplate: MirrorFieldTemplate;
    // List of fields that use this field inside mirror logic
    valueDependencies: FieldInstance[] = [];

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

    // We will override the updateValue method to handle mirror logic
    override updateValue(value: string): void {
        // Apply mirror rules.
        this.value.set(value);
    }

    constructor(mCaseService: mCaseUtilityService, value: string, fieldInstanceID: number, fieldTemplate: MirrorFieldTemplate) {
        super(mCaseService, value, fieldInstanceID, fieldTemplate);
        this.fieldTemplate = fieldTemplate;
    }

    override setRecordInstance(recordInstance: RecordInstance): RecordInstance {
        this.setupDependencies(recordInstance);
        return super.setRecordInstance(recordInstance);
    }
    setupDependencies(record: RecordInstance | null): void {
        // Get the field template
        const mirrorFieldTemplate = this.fieldTemplate;
        // Get the mirror dependencies
        const mirrorDependencies = mirrorFieldTemplate.regularValueDependencies;
        // Get the record instance
        const recordInstance = record ?? this.recordInstance;
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
    }
}