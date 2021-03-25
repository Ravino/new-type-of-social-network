"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportInitialization = void 0;
const passport_1 = __importDefault(require("passport"));
function passportInitialization(server) {
    server.use(passport_1.default.initialize());
}
exports.passportInitialization = passportInitialization;
//# sourceMappingURL=passport.js.map