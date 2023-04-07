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
exports.UserService = void 0;
const user_repository_1 = require("./../data/repositories/user.repository");
class UserService {
    constructor() {
        this._userRepository = new user_repository_1.UserRepository();
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPojo = this.parseDtoIntoPojo(user);
            const userPromise = yield this._userRepository
                .addUser(userPojo)
                .then((user) => {
                console.log("añadiendo user en service");
                return user;
            })
                .catch((error) => {
                console.error(error);
                console.error("ERROR añadiendo user en service");
                throw error;
            });
            return userPromise;
        });
    }
    parseDtoIntoPojo(userDto) {
        return userDto;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.services.js.map