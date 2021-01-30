"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const landingSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    backgroundName: {
        type: String,
    },
    backgroundURL: {
        type: String
    },
    backgroundColor: {
        type: String
    },
    logoName: {
        type: String
    },
    logoURL: {
        type: String
    },
    opacity: {
        type: Number
    },
    validationRut: {
        type: Boolean
    },
    elements: {
        type: Array
    }
});
exports.default = mongoose_1.model('Landing', landingSchema);
//# sourceMappingURL=landing.js.map