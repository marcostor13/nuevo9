"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongodb = void 0;
exports.mongodb = {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    DB: {
        URI: process.env.MONGODB_URI || "mongodb://localhost/biqondb",
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
};
//# sourceMappingURL=keys.js.map