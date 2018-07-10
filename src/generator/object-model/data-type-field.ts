
export class DataTypeField {
  constructor(
    readonly name: string,
    readonly type: string,
    readonly mandatory: boolean = true,
    readonly multiple: boolean = false) {

  }

  get optional() {
    return !this.mandatory;
  }
}
