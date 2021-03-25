"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerInitialization = void 0;
const typescript_ioc_1 = require("typescript-ioc");
const express_1 = require("express");
const signin_1 = require("../router/signin");
const router = express_1.Router();
router.use('/signin', typescript_ioc_1.Container.get(signin_1.Signin).middleware, typescript_ioc_1.Container.get(signin_1.Signin).resolver());
function routerInitialization(server) {
    server.use(router);
}
exports.routerInitialization = routerInitialization;
//# sourceMappingURL=router.js.map