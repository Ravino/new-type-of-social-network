"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registration = void 0;
const abstractRegistrationAuthorization_1 = require("./abstractRegistrationAuthorization");
class Registration extends abstractRegistrationAuthorization_1.AbstractRegistrationAuthorization {
    validateFirstname(firstname) {
        return true;
    }
    validateLastname(lastname) {
        return true;
    }
}
exports.Registration = Registration;
//# sourceMappingURL=registration.js.map