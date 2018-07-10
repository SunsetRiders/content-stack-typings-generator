"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = tslib_1.__importDefault(require("path"));
var handlebars_1 = tslib_1.__importDefault(require("handlebars"));
var ContentStackModelTemplate = /** @class */ (function () {
    function ContentStackModelTemplate() {
    }
    ContentStackModelTemplate.prototype.readFile = function (path) {
        return new Promise(function (resolve, reject) {
            fs_1.default.readFile(path, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data.toString());
                }
            });
        });
    };
    ContentStackModelTemplate.prototype.loadTemplateContent = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readFile(path_1.default.resolve(__dirname, ContentStackModelTemplate.templateFileName))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ContentStackModelTemplate.prototype.loadTemplate = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var templateContent;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this._template) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadTemplateContent()];
                    case 1:
                        templateContent = _a.sent();
                        this._template = handlebars_1.default.compile(templateContent);
                        _a.label = 2;
                    case 2: return [2 /*return*/, this._template];
                }
            });
        });
    };
    ContentStackModelTemplate.prototype.process = function (library) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var template;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadTemplate()];
                    case 1:
                        template = _a.sent();
                        return [2 /*return*/, template(library)];
                }
            });
        });
    };
    ContentStackModelTemplate.templateFileName = '../../../template/file-template.hbs';
    return ContentStackModelTemplate;
}());
exports.ContentStackModelTemplate = ContentStackModelTemplate;
//# sourceMappingURL=content-stack-model-template.js.map