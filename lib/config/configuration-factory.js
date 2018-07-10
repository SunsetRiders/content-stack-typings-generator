"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var command_line_args_1 = tslib_1.__importDefault(require("command-line-args"));
var command_line_usage_1 = tslib_1.__importDefault(require("command-line-usage"));
var configuration_1 = require("./configuration");
var ConfigurationFactory = /** @class */ (function () {
    function ConfigurationFactory(_config) {
        if (_config === void 0) { _config = ConfigurationFactory.readOptionsFromConsole(); }
        this._config = _config;
    }
    ConfigurationFactory.prototype.getUsage = function () {
        return command_line_usage_1.default([
            {
                header: 'Typings Generator for ContentStack Content Types'
            },
            {
                header: 'Options',
                optionList: [
                    { name: 'apikey', description: 'The API KEY for the Content Stack' },
                    { name: 'authtoken', description: 'The AUTH TOKEN for the Content Stack' },
                    { name: 'out', description: 'The output directory for the generated typings' }
                ]
            }
        ]);
    };
    ConfigurationFactory.prototype.create = function () {
        var config = this._config;
        return configuration_1.isValid(config) ? config : null;
    };
    ConfigurationFactory.readOptionsFromConsole = function () {
        var optionDefinitions = [
            { name: 'apikey', type: String },
            { name: 'authtoken', type: String },
            { name: 'out', alias: 'o', type: String }
        ];
        return command_line_args_1.default(optionDefinitions);
    };
    return ConfigurationFactory;
}());
exports.ConfigurationFactory = ConfigurationFactory;
//# sourceMappingURL=configuration-factory.js.map