import { FieldTemplate } from "../../baseTemplates/FieldTemplate";
import { DateFieldTemplate } from "../../fieldTemplates/DateFieldTemplate";
import { FieldInstance } from "../FieldInstance";

export class DateFieldInstance extends FieldInstance{
    override fieldTemplate: DateFieldTemplate;
    constructor(value: string, fieldInstanceID: number, fieldTemplate: FieldTemplate) {
        super(value, fieldInstanceID, fieldTemplate);
        this.fieldTemplate = fieldTemplate as DateFieldTemplate;
    }
}