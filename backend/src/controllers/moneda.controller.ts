import { MonedaService } from "../services/moneda.services";

// Crea una instancia del servicio de usuario
const monedaService: MonedaService = new MonedaService();

export const MonedaController = {
  getAllCryptos: (_req: any, res: any) => {
    monedaService
      .getAllCryptos()
      .then((result) => {
        console.log("Obyeniendo monedas desde controller");
        res.json(result);
      })
      .catch((exception) => {
        console.log("Error Obyeniendo monedas desde controller");

        console.log(exception);
        res.sendStatus(500);
      });
  },
}