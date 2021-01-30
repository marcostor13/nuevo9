"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singIn = exports.singUp = void 0;
const user_1 = require("../models/user");
const jwt = require("jsonwebtoken");
const keys = require("../keys");
function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, keys.mongodb.jwtSecret, {
        expiresIn: 86400
    });
}
exports.singUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, role, email, password } = req.body;
    if (!name || !role || !email || !password) {
        return res.status(400).json({ message: 'Debe completar todos los datos' });
    }
    const user = yield user_1.default.findOne({ email: email });
    if (user) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }
    const newUser = new user_1.default(req.body);
    yield newUser.save();
    return res.status(200).json(newUser);
});
exports.singIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Debe completar todos los datos' });
    }
    const user = yield user_1.default.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ message: 'El usuario no existe' });
    }
    const isEqualPassword = yield user.comparePassword(password);
    if (isEqualPassword) {
        return res.status(200).json({
            name: user.name || '',
            email: user.email,
            role: user.role || '',
            token: createToken(user)
        });
    }
    return res.status(400).json({ message: 'El correo o la contraseña son incorrectas' });
});
//# sourceMappingURL=user.controller.js.map