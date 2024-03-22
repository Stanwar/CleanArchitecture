import { FieldInstance } from "../../domain/entities/models/FieldInstance";
import { IClientSideValidation } from "./IClientSideValidation";

export interface FieldControl {
    fieldControlID: string;
    fieldData: FieldInstance;
    value: any;
    fieldEl: HTMLElement;
    // errorMessages: IErrorInterface[];
    controlValidations: IClientSideValidation[] | null;
}