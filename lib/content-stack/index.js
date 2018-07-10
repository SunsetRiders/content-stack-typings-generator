"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FieldDataType;
(function (FieldDataType) {
    FieldDataType["Text"] = "text";
    FieldDataType["Reference"] = "reference";
    FieldDataType["Boolean"] = "boolean";
    FieldDataType["Group"] = "group";
    FieldDataType["Link"] = "link";
    FieldDataType["File"] = "file";
    FieldDataType["Date"] = "date";
    FieldDataType["IsoDate"] = "isodate";
    FieldDataType["Number"] = "number";
})(FieldDataType = exports.FieldDataType || (exports.FieldDataType = {}));
function isReferenceField(field) {
    return field.data_type === FieldDataType.Reference;
}
exports.isReferenceField = isReferenceField;
function isGroupField(field) {
    return field.data_type === FieldDataType.Group;
}
exports.isGroupField = isGroupField;
//# sourceMappingURL=index.js.map