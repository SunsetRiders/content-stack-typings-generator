"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
function loadContentTypes(config) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var headers, response;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = {
                        'api_key': config.apikey,
                        'authtoken': config.authtoken,
                        'include_count': 'true'
                    };
                    return [4 /*yield*/, node_fetch_1.default('https://cdn.contentstack.io/v3/content_types', {
                            method: 'GET',
                            headers: headers
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.loadContentTypes = loadContentTypes;
//# sourceMappingURL=load-content-type.js.map