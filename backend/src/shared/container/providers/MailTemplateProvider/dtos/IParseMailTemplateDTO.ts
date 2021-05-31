interface ITemplateVariables {
	[keyName: string]: string | number;
}

export default interface IParseMailTemplateDTO {
	file: string;
	variables: ITemplateVariables;
}
