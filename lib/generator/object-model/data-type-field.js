"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataTypeField = /** @class */ (function () {
    function DataTypeField(name, type, mandatory, multiple) {
        if (mandatory === void 0) { mandatory = true; }
        if (multiple === void 0) { multiple = false; }
        this.name = name;
        this.type = type;
        this.mandatory = mandatory;
        this.multiple = multiple;
    }
    Object.defineProperty(DataTypeField.prototype, "optional", {
        get: function () {
            return !this.mandatory;
        },
        enumerable: true,
        configurable: true
    });
    return DataTypeField;
}());
exports.DataTypeField = DataTypeField;
//# sourceMappingURL=data-type-field.js.map