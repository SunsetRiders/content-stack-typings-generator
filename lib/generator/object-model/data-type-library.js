"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var data_type_definition_1 = require("./data-type-definition");
var DataTypeLibrary = /** @class */ (function () {
    function DataTypeLibrary() {
        this._types = new Map();
    }
    Object.defineProperty(DataTypeLibrary.prototype, "allTypes", {
        get: function () {
            var e_1, _a;
            var types = [];
            try {
                for (var _b = tslib_1.__values(this._types.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var type = _c.value;
                    types.push(type);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return types;
        },
        enumerable: true,
        configurable: true
    });
    DataTypeLibrary.prototype.containsKey = function (name) {
        return this._types.has(name);
    };
    DataTypeLibrary.prototype.get = function (name) {
        return this._types.get(name);
    };
    DataTypeLibrary.prototype.getOrPut = function (name, creator) {
        if (!this._types.has(name)) {
            this._types.set(name, creator());
        }
        return this.get(name);
    };
    DataTypeLibrary.prototype.createTypeDefinition = function (name, fields) {
        var type = new data_type_definition_1.DataTypeDefinition(name, fields);
        this._types.set(name, type);
        return type;
    };
    return DataTypeLibrary;
}());
exports.DataTypeLibrary = DataTypeLibrary;
//# sourceMappingURL=data-type-library.js.map