import { FieldDependencyOption } from "./FieldDependencyOption";

export class FieldDependency {
    allDependenciesMustPass: boolean = false;
    displayOption: string = ''; // TODO: Change to enum/constant
    dependencies: FieldDependencyOption[] = [];
}