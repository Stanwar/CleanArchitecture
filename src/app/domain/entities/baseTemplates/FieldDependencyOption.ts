export enum FieldDependencyType {
    Null = 'Null',
    NotNull = 'NotNull',
    Exact = 'Exact'
}
export class FieldDependencyOption {
    dependentFieldID: number = 0;
    dependentOnFieldID: number = 0;
    fieldDependencyID: number = 0;
    type: string = ''; // Null, Not Null, Exact
    value: string = '';
    // To note: This could be moved to the server side
    isValid(fieldInstanceValue: string): boolean {
        if (this.type === FieldDependencyType.Null && (fieldInstanceValue === '' || fieldInstanceValue === null)){
            return true;
        }
        if (this.type === FieldDependencyType.NotNull && (fieldInstanceValue !== '' && fieldInstanceValue !== null)){
            return true;
        }
        if (this.type === FieldDependencyType.Exact && this.value === fieldInstanceValue){
            return true;
        }
        return false;
    }
}