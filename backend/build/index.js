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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_config_1 = require("./data/config/server.config");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
//en el formato que se devuelve
app.use(express_1.default.json());
//antes del router
const allowedOrigins = ["http://localhost:4200"];
const options = {
    origin: allowedOrigins,
};
app.use((0, cors_1.default)(options));
//usa el router de usuarios
app.use("/api/users", user_routes_1.default);
const PORT = 3000;
console.log(`Servidor escuchando en el puerto ${PORT}`);
app.listen(PORT);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, server_config_1.connect)();
            console.log("Connection has been established successfully.");
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    });
}
main();
exports.default = app;
//alt + shift + o
//# sourceMappingURL=index.js.map