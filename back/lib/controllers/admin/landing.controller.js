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
exports.del = exports.update = exports.getByID = exports.get = exports.save = void 0;
const landing_1 = require("../../models/admin/landing");
const title = 'Landing';
exports.save = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newLanding = new landing_1.default(req.body);
    yield newLanding.save();
    return res.status(200).json({
        message: `${title} Cread@`,
        data: newLanding
    });
});
exports.get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    landing_1.default.find({}, (err, landing) => {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}s`,
                data: null
            });
        }
        res.status(200).json({
            message: '',
            data: landing
        });
    });
});
exports.getByID = (req, res) => {
    landing_1.default.findById(req.params.id, (err, landing) => {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}`,
                data: null
            });
        }
        res.status(200).json({
            message: '',
            data: landing
        });
    });
};
exports.update = (req, res) => {
    landing_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, landing) => {
        if (err) {
            res.status(501).json({
                message: `Error al actualizar ${title}`,
                data: null
            });
        }
        res.status(200).json({
            message: `${title} actualizad@`,
            data: landing
        });
    });
};
exports.del = (req, res) => {
    landing_1.default.remove({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(501).json({
                message: `Error al eliminar ${title}`,
                data: null
            });
        }
        res.status(200).json({
            message: `${title} eliminad@`,
            data: null
        });
    });
};
//# sourceMappingURL=landing.controller.js.map