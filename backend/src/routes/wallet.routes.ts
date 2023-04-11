import express from "express";
import { WalletController } from "../controllers/wallet.controller";

const router = express.Router();

//llama a las funciones
router.post("/add", WalletController.addToWallet);
router.put("/updateAmount/:newAmount/:user_id/:cripto_id", WalletController.updateAmount);

export default router;
module.exports = router;
