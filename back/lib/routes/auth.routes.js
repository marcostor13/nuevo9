"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./../controllers/user.controller");
const router = express_1.Router();
router.post('/signup', user_controller_1.singUp);
router.post('/signin', user_controller_1.singIn);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map