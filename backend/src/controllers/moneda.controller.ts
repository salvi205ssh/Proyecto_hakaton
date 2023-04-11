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

  updatestock: (req: any, res: any) => {
    const cripto_id = req.params.cripto_id;

    monedaService
      .updatestock(cripto_id)
      .then((result) => {
        console.log("Actualizando stock de monedas en controller");

        res.json(result);
      })
      .catch((exception) => {
        console.log("Error Actualizando stock de monedas en controller");

        console.log(exception);
        res.sendStatus(500);
      });
  },

  getCoinById: (req: any, res: any) => {
    try {
      //el + es un tipado forzado, obliga a que sea un numero
      const cripto_id = req.params.cripto_id;
      monedaService.getCoinById(cripto_id).then((result) => {
        res.json(result);
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

}