import { DatalistTemplate } from "../baseTemplates/DatalistTemplate";
import { FieldTemplate } from "../baseTemplates/FieldTemplate";

export class MirrorFieldTemplate extends FieldTemplate {
    mirrorDependencies: FieldTemplate[];
    override readonly: boolean = true;
    
    constructor(fieldId: number, fieldSystemName: string, fieldLabel: string,defaultValue: string){
        super(fieldId, fieldSystemName, fieldLabel, defaultValue);
        this.mirrorDependencies = [];
    }

    // We will add mirror dependencies on this template. 
    // This will hold all the fields that will make up this field's value
    setupMirrorDependencies(){
        if (!this.defaultValue || this.defaultValue.length === 0){
            return;
        }
        // TODO: Add to constants. Proper token matching
        const matches = this.defaultValue.match(/{\[(.*?)\]}/);
        // If there are matches, find relevant field templates
        if (matches){
            matches.forEach((match) => {
                // Find the field template by field system name
                const matchedField = this.datalist?.fields.find(f => f.fieldSystemName === match);
                if (matchedField){
                    this.mirrorDependencies.push(matchedField);
                }
            });
        }
    }
}