import express from "express";
import { WalletController } from "../controllers/wallet.controller";

const router = express.Router();

//llama a las funciones
router.post("/add", WalletController.addToWallet);

export default router;
module.exports = router;
