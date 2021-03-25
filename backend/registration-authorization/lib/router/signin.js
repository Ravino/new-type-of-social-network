"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signin = void 0;
const typescript_ioc_1 = require("typescript-ioc");
const express_1 = require("express");
const local_1 = require("./local");
class Signin {
    constructor() { }
    middleware(req, res, next) {
        next();
        return undefined;
    }
    resolver() {
        const router = express_1.Router();
        router.use('/local', typescript_ioc_1.Container.get(local_1.Local).middleware, typescript_ioc_1.Container.get(local_1.Local).resolver);
        return router;
    }
}
exports.Signin = Signin;
//# sourceMappingURL=signin.js.map