import { Injectable } from "@angular/core";

@Injectable({ 
    providedIn: 'root'
})
export class mCaseUtilityService 
{
    generateGuid(): string {
        // Generate a new GUID
        const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        return guid;
    }

    generateID(): number {  
        // Generate a new ID
        return Math.floor(Math.random() * 1000);
    }
}
