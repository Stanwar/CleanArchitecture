import { FieldDependencyOption } from "./FieldDependencyOption";

export class FieldDependency {
    allDependenciesMustPass: boolean = false;
    displayOption: string = ''; // TODO: Change to enum/constant Show/Hide/Disable
    dependencies: FieldDependencyOption[] = [];
}

export enum DependencyDisplayOption{
    Show = 'Show',
    Hide = 'Hide',
    Disable = 'Disable'
}