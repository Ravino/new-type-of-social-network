"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Local = void 0;
class Local {
    constructor() { }
    middleware(req, res, next) {
        next();
        return undefined;
    }
    resolver(req, res) {
        res.send("hello world");
        return undefined;
    }
}
exports.Local = Local;
//# sourceMappingURL=local.js.map