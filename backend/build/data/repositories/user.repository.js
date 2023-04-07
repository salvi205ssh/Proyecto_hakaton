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
exports.UserRepository = void 0;
const server_config_1 = require("../config/server.config");
const user_model_1 = require("../models/user.model");
const uuid_1 = require("uuid");
class UserRepository {
    constructor() {
        this._database = {};
        this._database = (0, server_config_1.connect)();
        this._userRepository = this._database.sequelize.getRepository(user_model_1.UserPojo);
    }
    addUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                newUser.user_id = (0, uuid_1.v4)();
                newUser = yield this._userRepository.create(newUser);
                console.log("añadiendo user en repository");
                return newUser;
            }
            catch (error) {
                console.error("Se ha producido un error al insertar usuario en repository");
                console.error(error);
                return null;
            }
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map