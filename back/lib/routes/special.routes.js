"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport = require("passport");
const router = express_1.Router();
router.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('okok');
});
exports.default = router;
//# sourceMappingURL=special.routes.js.map