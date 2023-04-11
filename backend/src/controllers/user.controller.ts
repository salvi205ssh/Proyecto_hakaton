import { UserService } from "../services/user.services";

// Crea una instancia del servicio de usuario
const userService: UserService = new UserService();

export const UserController = {
  addUser: (req: any, res: any) => {
    try {
      const newUser = req.body;
      userService.addUser(newUser).then((result) => {
        // Envía una respuesta con el resultado de la operación
        console.log("añadiendo user en controller");

        res.json(result);
      });
    } catch (exception) {
      console.log(exception);
      console.error("ERROR añadiendo user en controller");

      res.sendStatus(500);
    }
  },

  getUserByLogin: (req: any, res: any) => {
    try {
      const username = req.params.username;
      const password = req.params.password;
      userService.getLogin(username, password).then((result) => {
        res.json(result);
        console.log("logueando user en controller");
      });
    } catch (error) {
      console.log("Error al loguear user en el controller");

      console.log(error);
      res.sendStatus(500);
    }
  },

  getAllCryptosUser: (req: any, res: any) => {
    const user_id = req.params.user_id;

    userService
      .getAllCryptosUser(user_id)
      .then((result) => {
        console.log("obteniendo monedas de users en controller");

        res.json(result);
      })
      .catch((exception) => {
        console.log("Error obteniendo monedas de users en controller");

        console.log(exception);
        res.sendStatus(500);
      });
  },
  updateDeposit: (req: any, res: any) => {
    const user_id = req.params.user_id;
    const costeMoneda = +req.params.costeMoneda;

    userService
      .updateDeposit(costeMoneda, user_id)
      .then((result) => {
        console.log("Actualizando deposit de users en controller");

        res.json(result);
      })
      .catch((exception) => {
        console.log("Error Actualizando deposit de users en controller");

        console.log(exception);
        res.sendStatus(500);
      });
  },

  getAllUsers: (_req: any, res: any) => {
    userService
      .getAllUsers()
      .then((result) => {
        res.json(result);
      })
      .catch((exception) => {
        console.log(exception);
        res.sendStatus(500);
      });
  },
};
