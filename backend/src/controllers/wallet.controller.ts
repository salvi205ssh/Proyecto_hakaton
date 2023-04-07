import { WalletService } from "../services/wallet.services";

// Crea una instancia del servicio de usuario
const walletService: WalletService = new WalletService();

export const WalletController = {
  addToWallet: (req: any, res: any) => {
    try {
      const newWallet = req.body;
      walletService.addToWallet(newWallet).then((result) => {
        // Envía una respuesta con el resultado de la operación
        console.log("Comprando moneda en controller");

        res.json(result);
      });
    } catch (exception) {
      console.log(exception);
      console.error("ERROR Comprando moneda en controller");

      res.sendStatus(500);
    }
  },
};
