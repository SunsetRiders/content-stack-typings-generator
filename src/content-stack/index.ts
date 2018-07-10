
export interface ContentTypes {
  content_types: ContentType[];
}

export interface ContentType {
  uid: string;
  title: string;
  description: string;
  schema: Field[];
}

export enum FieldDataType {
  Text = 'text',
  Reference = 'reference',
  Boolean = 'boolean',
  Group = 'group',
  Link = 'link',
  File = 'file',
  Date = 'date',
  IsoDate = 'isodate',
  Number = 'number'
}

export interface Field {
  uid: string;
  display_name: string;
  data_type: FieldDataType;
  mandatory: boolean;
  multiple: boolean;
}

export interface BooleanField extends Field {
  data_type: FieldDataType.Boolean;
  field_metadata: {
    default_value: boolean | null;
    instruction: string;
  };
}

export interface DateField extends Field {
  data_type: FieldDataType.Date;
  field_metadata: {};
}

export interface FileField extends Field {
  data_type: FieldDataType.File;
  extensions: string[];
  field_metadata: {
    rich_text_type: string;
  };
}

export interface GroupField extends Field {
  data_type: FieldDataType.Group;
  schema: Field[];
  field_metadata: {};
}

export interface LinkField extends Field {
  data_type: FieldDataType.Link;
  field_metadata: {};
}

export interface NumberField extends Field {
  data_type: FieldDataType.Number;
  field_metadata: {};
}

export interface ReferenceField extends Field {
  data_type: FieldDataType.Reference;
  reference_to: string;
  field_metadata: {
    ref_multiple: boolean;
  };
}

export interface TextField extends Field {
  data_type: FieldDataType.Text;
  format: string;
  error_messages: {
    [key: string]: string;
  };
  field_metadata: {
    placeholder: string;
  };
}

export function isReferenceField(field: Field): field is ReferenceField {
  return field.data_type === FieldDataType.Reference;
}

export function isGroupField(field: Field): field is GroupField {
  return field.data_type === FieldDataType.Group;
}
