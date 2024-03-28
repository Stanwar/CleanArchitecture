import { computed, signal } from "@angular/core";
import { FieldInstance } from "./FieldInstance";
// This holds all the field instances for a record.
export class RecordInstance {
    recordID: number = 0;
    parentRecordID: number = 0;
    fields: FieldInstance[] = [];
    totalFields = computed(() => this.fields.length);
    isValid: boolean = true;
    errorMessages: string[] = [];
    // TODO: Reevaluate the need for this property
    hasChildRecords: boolean = false;
    // private fieldNameToFieldIDMapper: Map<string, number> = new Map<string, number>();
    fieldNameToFieldIDMapper = computed(()=> { 
        const returnValue = new Map<string, number>();
        this.fields.forEach(f => {
            returnValue.set(f.fieldTemplate.fieldSystemName, f.fieldInstanceID);
        });
        const val = this.totalFields();
        return returnValue;
    });

    fieldStore = computed(() => {
        const returnValue = new Map<number, FieldInstance>();
        this.fields.forEach(f => {
            returnValue.set(f.fieldInstanceID, f);
        });
        return returnValue;
    });
    private childRecords: number[] = [];
    constructor(recordID: number, fields: FieldInstance[]) {
        this.recordID = recordID;
        this.fields = fields;
    }

    // TODO: Add a map of field instances
    getChildRecords(depth: number): number[] {
        // Call to store. Ngrx signal state store?
        // GetStore().getRecordChildren(this.recordID, depth);
        return this.childRecords;
    }
    getFieldByID(fieldID: number): FieldInstance | undefined {
        return this.fieldStore().get(fieldID);
    }

    getFieldBySystemName(fieldSystemName: string): FieldInstance | undefined {
        const fieldID = this.fieldNameToFieldIDMapper().get(fieldSystemName);
        if (!fieldID){
            return undefined;
        }
        return this.getFieldByID(fieldID);
    }
}