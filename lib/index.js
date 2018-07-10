"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var config_1 = require("./config");
var generator_1 = require("./generator");
function main() {
    var configFactory = new config_1.ConfigurationFactory();
    var config = configFactory.create();
    if (!config) {
        console.log(configFactory.getUsage());
        return;
    }
    var generator = new generator_1.TypingsGenerator(config);
    generator.generate();
    console.log(chalk_1.default.green('FINISHED'));
}
main();
//# sourceMappingURL=index.js.map