import { computed, signal } from "@angular/core";
import { FieldInstance } from "./FieldInstance";
import { mCaseUtilityService } from "../../../services/MCaseUtilityService";
// This holds all the field instances for a record.
export class RecordInstance {
    recordID: number = 0;
    parentRecordID: number = 0;
    fields: FieldInstance[] = [];
    isValid: boolean = true;
    errorMessages: string[] = [];
    // TODO: Reevaluate the need for this property
    hasChildRecords: boolean = false;
    datalistTemplateID: number = 0;
    //#region Computed properties
    totalFields = computed(() => this.fields.length);
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
    //#endregion
    private childRecords: number[] = [];
    constructor(mCaseService: mCaseUtilityService, recordID: number = 0, fields: FieldInstance[]) {
        this.recordID = recordID > 0 ? recordID : mCaseService.generateID();
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