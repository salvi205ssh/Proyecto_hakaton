"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_services_1 = require("../services/user.services");
// Crea una instancia del servicio de usuario
const userService = new user_services_1.UserService();
exports.UserController = {
    addUser: (req, res) => {
        try {
            const newUser = req.body;
            userService.addUser(newUser).then((result) => {
                // Envía una respuesta con el resultado de la operación
                console.log("añadiendo user en controller");
                res.json(result);
            });
        }
        catch (exception) {
            console.log(exception);
            console.error("ERROR añadiendo user en controller");
            res.sendStatus(500);
        }
    },
};
//# sourceMappingURL=user.controller.js.map