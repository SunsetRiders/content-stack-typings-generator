import { DataTypeField } from './data-type-field';
import { DataTypeDefinition } from './data-type-definition';

export class DataTypeLibrary {
  private _types = new Map<string, DataTypeDefinition>();

  get allTypes() {
    const types: DataTypeDefinition[] = [];

    for (const type of this._types.values()) {
      types.push(type);
    }

    return types;
  }

  containsKey(name: string) {
    return this._types.has(name);
  }

  get(name: string) {
    return this._types.get(name);
  }

  getOrPut(name: string, creator: () => DataTypeDefinition) {
    if (!this._types.has(name)) {
      this._types.set(name, creator());
    }

    return this.get(name);
  }

  createTypeDefinition(name: string, fields: DataTypeField[]) {
    const type = new DataTypeDefinition(name, fields);
    this._types.set(name, type);

    return type;
  }
}
