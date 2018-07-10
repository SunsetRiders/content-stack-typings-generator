"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValid(config) {
    return (!!config.apikey
        && !!config.authtoken
        && !!config.out);
}
exports.isValid = isValid;
//# sourceMappingURL=configuration.js.map