import {
  ContentType,
  FieldDataType,
  Field,
  GroupField,
  isReferenceField,
  isGroupField
} from '../../content-stack';
import { DataTypeLibrary, DataTypeField } from '../object-model';
import { toPascalCase } from './string-utils';

type TypeMapper = (field: Field, library: DataTypeLibrary, parentType?: string) => string;

function mapType(dataType: FieldDataType, typeNameOrMapper: string | TypeMapper): [FieldDataType, TypeMapper] {
  if (typeof typeNameOrMapper === 'string') {
    return [dataType, () => typeNameOrMapper];
  }

  return [dataType, typeNameOrMapper];
}

export class NoSupportedField {
  constructor(
    readonly field: Field,
    readonly message: string = `Expect a field of type ${FieldDataType.Reference}`) {

  }
}

export class NoParentType {
  constructor(
    readonly field: Field,
    readonly message: string = `No parent type for ${field.data_type}`) {

  }
}

const mapReferenceType: TypeMapper = (field, library) => {
  if (!isReferenceField(field)) {
    throw new NoSupportedField(field);
  }

  return toPascalCase(field.reference_to);
};

const mapToGroupType: TypeMapper = (field, library, parentType) => {
  if (!isGroupField(field)) {
    throw new NoSupportedField(field);
  }

  if (!parentType) {
    throw new NoParentType(field);
  }

  return createGroupType(field, library, parentType);
};

const typeMappers = new Map<FieldDataType, TypeMapper>([
  mapType(FieldDataType.Text, 'string'),
  mapType(FieldDataType.Boolean, 'boolean'),
  mapType(FieldDataType.Number, 'number'),
  mapType(FieldDataType.Date, 'string'),
  mapType(FieldDataType.IsoDate, 'string'),
  mapType(FieldDataType.File, 'File'),
  mapType(FieldDataType.Link, 'Link'),
  mapType(FieldDataType.Reference, mapReferenceType),
  mapType(FieldDataType.Group, mapToGroupType)
]);

function extractTypeName(field: Field, library: DataTypeLibrary, parentType?: string) {
  const mapper = typeMappers.get(field.data_type);

  if (mapper) {
    return mapper(field, library, parentType);
  }

  throw new Error(`Unknown field type: ${field.data_type}`);
}

function createGroupType(field: GroupField, library: DataTypeLibrary, parentType: string) {
  const typeName = `${parentType}$${toPascalCase(field.uid)}`;

  const fields = field.schema.map(x =>
    new DataTypeField(
      x.uid,
      extractTypeName(x, library, typeName),
      x.mandatory,
      x.multiple || isReferenceField(x)
    )
  );

  const typeDefinition = library.createTypeDefinition(typeName, fields);

  return typeDefinition.name;
}

function addToLibrary(library: DataTypeLibrary, contentType: ContentType) {
  const typeName = toPascalCase(contentType.uid);

  if (library.containsKey(typeName)) {
    return;
  }

  const fields = contentType.schema.map(
    x => new DataTypeField(
      x.uid,
      extractTypeName(x, library, typeName),
      x.mandatory,
      x.multiple || isReferenceField(x)
    )
  );

  library.createTypeDefinition(typeName, fields);
}

export function convertAllToDataType(contentTypes: ContentType[]): DataTypeLibrary {
  const library = new DataTypeLibrary();

  library.createTypeDefinition('File', [
    new DataTypeField('file', 'string'),
    new DataTypeField('link', 'string'),
    new DataTypeField('image_thumbnail', 'string'),
    new DataTypeField('file_detail', 'string'),
    new DataTypeField('title', 'string'),
    new DataTypeField('text', 'string'),
    new DataTypeField('button_label', 'string'),
  ]);

  library.createTypeDefinition('Link', [
    new DataTypeField('title', 'string'),
    new DataTypeField('href', 'string')
  ]);

  for (const contentType of contentTypes) {
    addToLibrary(library, contentType);
  }

  return library;
}
