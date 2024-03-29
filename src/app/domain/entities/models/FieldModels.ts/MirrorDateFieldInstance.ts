import { MirrorDateFieldTemplate } from "../../fieldTemplates/MirrorDateFieldTemplate";
import { DateFieldInstance } from "./DateFieldInstance";

export class MirrorDateFieldInstance extends DateFieldInstance {
    constructor(value: string, fieldInstanceID: number, fieldTemplate: MirrorDateFieldTemplate) {
        super(value, fieldInstanceID, fieldTemplate);
    }
}