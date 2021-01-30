"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const landing_controller_1 = require("./../../controllers/admin/landing.controller");
const router = express_1.Router();
router.post('/save-landing', landing_controller_1.save);
router.get('/get-landings', landing_controller_1.get);
router.get('/get-landing-by-id/:id', landing_controller_1.getByID);
router.patch('/update-landing/:id', landing_controller_1.update);
router.delete('/delete-landing/:id', landing_controller_1.del);
exports.default = router;
//# sourceMappingURL=landing.routes.js.map