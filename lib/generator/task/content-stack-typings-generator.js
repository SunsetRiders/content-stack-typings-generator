"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var shelljs_1 = tslib_1.__importDefault(require("shelljs"));
var content_stack_model_template_1 = require("./content-stack-model-template");
var ContentStackTypingsGenerator = /** @class */ (function () {
    function ContentStackTypingsGenerator(template) {
        if (template === void 0) { template = new content_stack_model_template_1.ContentStackModelTemplate(); }
        this.template = template;
    }
    ContentStackTypingsGenerator.prototype.writeFile = function (path, content) {
        return new Promise(function (resolve, reject) {
            fs_1.default.writeFile(path, content, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    ContentStackTypingsGenerator.prototype.ensureDirectoryExists = function (directory) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, shelljs_1.default.mkdir("-p", directory)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ContentStackTypingsGenerator.prototype.generateFile = function (config, library) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rootFileName, directory, _a, _b, e_1;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        rootFileName = path_1.default.resolve(config.output);
                        directory = path_1.default.dirname(rootFileName);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 6]);
                        console.log(chalk_1.default.gray('Generating file...'));
                        return [4 /*yield*/, this.ensureDirectoryExists(directory)];
                    case 2:
                        _c.sent();
                        _a = this.writeFile;
                        _b = [rootFileName];
                        return [4 /*yield*/, this.template.process(library)];
                    case 3: return [4 /*yield*/, _a.apply(this, _b.concat([_c.sent()]))];
                    case 4:
                        _c.sent();
                        console.log(chalk_1.default.green("File generated: " + rootFileName));
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _c.sent();
                        console.error(chalk_1.default.red(e_1.message));
                        throw e_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return ContentStackTypingsGenerator;
}());
exports.ContentStackTypingsGenerator = ContentStackTypingsGenerator;
//# sourceMappingURL=content-stack-typings-generator.js.map