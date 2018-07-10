"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var task_1 = require("./task");
var TypingsGenerator = /** @class */ (function () {
    function TypingsGenerator(config, generator) {
        if (generator === void 0) { generator = new task_1.ContentStackTypingsGenerator(); }
        this.config = config;
        this.generator = generator;
    }
    TypingsGenerator.prototype.generate = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var config, contentTypes, library;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = this.config;
                        return [4 /*yield*/, task_1.loadContentTypes(this.config)];
                    case 1:
                        contentTypes = _a.sent();
                        library = task_1.convertAllToDataType(contentTypes.content_types);
                        return [4 /*yield*/, this.generator.generateFile(config, library)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TypingsGenerator;
}());
exports.TypingsGenerator = TypingsGenerator;
//# sourceMappingURL=typings-generator.js.map