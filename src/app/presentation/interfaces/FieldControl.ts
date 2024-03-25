import { FieldInstance } from "../../domain/entities/models/FieldInstance";
import { mCaseUtilityService } from "../../services/MCaseUtilityService";
import { IClientSideValidation } from "./IClientSideValidation";

export abstract class FieldControl {
    fieldControlID: string;
    fieldEl!: HTMLElement | null;
    // errorMessages: IErrorInterface[];
    controlValidations!: IClientSideValidation[] | null;
    constructor(mCaseService: mCaseUtilityService) {
        this.fieldControlID = mCaseService.generateGuid();
    }
}