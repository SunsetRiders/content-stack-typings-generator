import { ContentType, FieldDataType, Field, GroupField, ReferenceField, isReferenceField, isGroupField } from '../../content-stack';
import { DataTypeLibrary, DataTypeDefinition, DataTypeField } from '../object-model';
import { toPascalCase } from './string-utils';

type TypeMapper = (field: Field, library: DataTypeLibrary) => string;

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

const mapReferenceType: TypeMapper = (field, library) => {
  if (!isReferenceField(field)) {
    throw new NoSupportedField(field);
  }

  return toPascalCase(field.reference_to);
};

const mapToGroupType: TypeMapper = (field, library) => {
  if (!isGroupField(field)) {
    throw new NoSupportedField(field);
  }

  return createGroupType(field, library);
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

function extractTypeName(field: Field, library: DataTypeLibrary) {
  const mapper = typeMappers.get(field.data_type);

  if (mapper) {
    return mapper(field, library);
  }

  throw new Error(`Unknown field type: ${field.data_type}`);
}

let counter = 0;

function createGroupType(field: GroupField, library: DataTypeLibrary) {
  const typeName = `InlineGroup${++counter}`;
  const fields = field.schema.map(x => new DataTypeField(x.uid, extractTypeName(x, library), x.mandatory));
  const typeDefinition = library.createTypeDefinition(typeName, fields);
  
  return typeDefinition.name;
}

function addToLibrary(library: DataTypeLibrary, contentType: ContentType) {
  if (library.containsKey(contentType.uid)) {
    return;
  }

  const typeName = toPascalCase(contentType.uid);
  const fields = contentType.schema.map(x => new DataTypeField(x.uid, extractTypeName(x, library), x.mandatory));
  
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
