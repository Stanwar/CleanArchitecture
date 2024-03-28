import { DatalistTemplate } from "../baseTemplates/DatalistTemplate";
import { FieldTemplate } from "../baseTemplates/FieldTemplate";

export class MirrorFieldTemplate extends FieldTemplate {
    regularValueDependencies: FieldTemplate[];
    dynamicValueDependencies: FieldTemplate[];
    override readonly: boolean = true;
    
    constructor(fieldId: number, fieldSystemName: string, fieldLabel: string,defaultValue: string){
        super(fieldId, fieldSystemName, fieldLabel, defaultValue);
        this.regularValueDependencies = [];
        this.dynamicValueDependencies = [];
    }

    // We will add mirror dependencies on this template. 
    // This will hold all the fields that will make up this field's value
    // Create a tokenization system to get the fields that are dependent on this field
    setupMirrorDependencies(){
        if (!this.defaultValue || this.defaultValue.length === 0){
            return;
        }
        // TODO: Add to constants. Proper token matching
        // Find all matches in the default value
        const matches = this.defaultValue.match(/{\[(.*?)\]}/g);

        if (!matches){
            return;
        }

        // Go over each map
        matches.forEach((match) => {
            // Check for parent/DDD mirror
            if (match.includes(":")){
                // Get value from datalist store to be created later
                // this.dynamicValueDependencies.push(match);
                // Get all dynamic fields and parent fields
            }
            else {     
                // For first match mostly       
                if (match.startsWith("{[")){
                    match = match.substring(2, match.length - 1);
                }    
                const matchedField = this.datalist?.fieldMap().get(match);
                if (matchedField){
                    this.regularValueDependencies.push(matchedField);
                }
            }
        });
    }
}