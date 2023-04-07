"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
//llama a las funciones
router.post("/add", user_controller_1.UserController.addUser);
exports.default = router;
module.exports = router;
//# sourceMappingURL=user.routes.js.map