import { FieldTemplate } from "../../baseTemplates/FieldTemplate";
import { HeaderFieldTemplate } from "../../fieldTemplates/HeaderFieldTemplate";
import { FieldInstance } from "../FieldInstance";

export class HeaderFieldInstance extends FieldInstance{
    override fieldTemplate: HeaderFieldTemplate;
    constructor(value: string, fieldInstanceID: number, fieldTemplate: FieldTemplate) {
        super(value, fieldInstanceID, fieldTemplate);
        this.fieldTemplate = fieldTemplate as HeaderFieldTemplate;
    }
}