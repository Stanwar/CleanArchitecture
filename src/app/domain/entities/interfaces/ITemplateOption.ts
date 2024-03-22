export interface ITemplateOption {
    optionName: string;
    optionValue: string;
    dependentOptions: Map<string, ITemplateOption>;
}