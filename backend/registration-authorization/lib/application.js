"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./config/server");
const passport_1 = require("./config/passport");
const router_1 = require("./config/router");
passport_1.passportInitialization(server_1.server);
router_1.routerInitialization(server_1.server);
server_1.server.listen(3000, () => {
    console.log(`Application started on port 3000...`);
});
//# sourceMappingURL=application.js.map