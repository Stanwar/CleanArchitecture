import { FieldInstance } from "./FieldInstance";
// This holds all the field instances for a record.
export class RecordInstance {
    recordID: number = 0;
    fields: FieldInstance[] = [];
    isValid: boolean = true;
    errorMessages: string[] = [];
    // TODO: Reevaluate the need for this property
    hasChildRecords: boolean = false;
    private childRecords: number[] = [];
    constructor(recordID: number, fields: FieldInstance[]) {
        this.recordID = recordID;
        this.fields = fields;
    }

    getFieldInstance(fieldSystemName: string): FieldInstance | undefined {
        return this.fields.find(f => f.fieldTemplate.fieldSystemName === fieldSystemName);
    }
    getChildRecords(depth: number): number[] {
        // Call to store
        // GetStore().getRecordChildren(this.recordID, depth);
        return this.childRecords;
    }
}