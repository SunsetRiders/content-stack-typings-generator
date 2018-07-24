"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var content_stack_1 = require("../../content-stack");
var object_model_1 = require("../object-model");
var string_utils_1 = require("./string-utils");
function mapType(dataType, typeNameOrMapper) {
    if (typeof typeNameOrMapper === 'string') {
        return [dataType, function () { return typeNameOrMapper; }];
    }
    return [dataType, typeNameOrMapper];
}
var NoSupportedField = /** @class */ (function () {
    function NoSupportedField(field, message) {
        if (message === void 0) { message = "Expect a field of type " + content_stack_1.FieldDataType.Reference; }
        this.field = field;
        this.message = message;
    }
    return NoSupportedField;
}());
exports.NoSupportedField = NoSupportedField;
var NoParentType = /** @class */ (function () {
    function NoParentType(field, message) {
        if (message === void 0) { message = "No parent type for " + field.data_type; }
        this.field = field;
        this.message = message;
    }
    return NoParentType;
}());
exports.NoParentType = NoParentType;
var mapReferenceType = function (field, library) {
    if (!content_stack_1.isReferenceField(field)) {
        throw new NoSupportedField(field);
    }
    return string_utils_1.toPascalCase(field.reference_to);
};
var mapToGroupType = function (field, library, parentType) {
    if (!content_stack_1.isGroupField(field)) {
        throw new NoSupportedField(field);
    }
    if (!parentType) {
        throw new NoParentType(field);
    }
    return createGroupType(field, library, parentType);
};
var typeMappers = new Map([
    mapType(content_stack_1.FieldDataType.Text, 'string'),
    mapType(content_stack_1.FieldDataType.Boolean, 'boolean'),
    mapType(content_stack_1.FieldDataType.Number, 'number'),
    mapType(content_stack_1.FieldDataType.Date, 'string'),
    mapType(content_stack_1.FieldDataType.IsoDate, 'string'),
    mapType(content_stack_1.FieldDataType.File, 'File'),
    mapType(content_stack_1.FieldDataType.Link, 'Link'),
    mapType(content_stack_1.FieldDataType.Reference, mapReferenceType),
    mapType(content_stack_1.FieldDataType.Group, mapToGroupType)
]);
function extractTypeName(field, library, parentType) {
    var mapper = typeMappers.get(field.data_type);
    if (mapper) {
        return mapper(field, library, parentType);
    }
    throw new Error("Unknown field type: " + field.data_type);
}
function createGroupType(field, library, parentType) {
    var typeName = parentType + "$" + string_utils_1.toPascalCase(field.uid);
    var fields = field.schema.map(function (x) {
        return new object_model_1.DataTypeField(x.uid, extractTypeName(x, library, typeName), x.mandatory, x.multiple || content_stack_1.isReferenceField(x));
    });
    var typeDefinition = library.createTypeDefinition(typeName, fields);
    return typeDefinition.name;
}
function addToLibrary(library, contentType) {
    var typeName = string_utils_1.toPascalCase(contentType.uid);
    if (library.containsKey(typeName)) {
        return;
    }
    var fields = contentType.schema.map(function (x) { return new object_model_1.DataTypeField(x.uid, extractTypeName(x, library, typeName), x.mandatory, x.multiple || content_stack_1.isReferenceField(x)); });
    library.createTypeDefinition(typeName, fields);
}
function convertAllToDataType(contentTypes) {
    var e_1, _a;
    var library = new object_model_1.DataTypeLibrary();
    library.createTypeDefinition('File', [
        new object_model_1.DataTypeField('file', 'string'),
        new object_model_1.DataTypeField('link', 'string'),
        new object_model_1.DataTypeField('image_thumbnail', 'string'),
        new object_model_1.DataTypeField('file_detail', 'string'),
        new object_model_1.DataTypeField('title', 'string'),
        new object_model_1.DataTypeField('text', 'string'),
        new object_model_1.DataTypeField('button_label', 'string'),
        new object_model_1.DataTypeField('url', 'string')
    ]);
    library.createTypeDefinition('Link', [
        new object_model_1.DataTypeField('title', 'string'),
        new object_model_1.DataTypeField('href', 'string')
    ]);
    try {
        for (var contentTypes_1 = tslib_1.__values(contentTypes), contentTypes_1_1 = contentTypes_1.next(); !contentTypes_1_1.done; contentTypes_1_1 = contentTypes_1.next()) {
            var contentType = contentTypes_1_1.value;
            addToLibrary(library, contentType);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (contentTypes_1_1 && !contentTypes_1_1.done && (_a = contentTypes_1.return)) _a.call(contentTypes_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return library;
}
exports.convertAllToDataType = convertAllToDataType;
//# sourceMappingURL=content-stack-to-data-type-converter.js.map