"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toPascalCase(name) {
    var names = name.split('_');
    var pascalNames = names.map(function (x) { return x.slice(0, 1).toUpperCase() + (x.length > 1 ? x.slice(1) : ''); });
    return pascalNames.join('');
}
exports.toPascalCase = toPascalCase;
//# sourceMappingURL=string-utils.js.map