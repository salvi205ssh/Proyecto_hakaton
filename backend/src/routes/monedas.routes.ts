import express from "express";
import { MonedaController } from "../controllers/moneda.controller";

const router = express.Router();

//llama a las funciones
router.get("/all", MonedaController.getAllCryptos);
router.put("/updatestock/:cripto_id", MonedaController.updatestock);
router.get("/getCoinById/:cripto_id", MonedaController.getCoinById);

export default router;
module.exports = router;
