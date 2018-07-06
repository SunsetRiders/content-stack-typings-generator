import { DataTypeField } from "./data-type-field";

export class DataTypeDefinition {
  constructor(
    readonly name: string,
    readonly fields: DataTypeField[] = []) {

  }
}
