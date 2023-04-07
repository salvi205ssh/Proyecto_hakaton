import express from "express";
import { MonedaController } from "../controllers/moneda.controller";

const router = express.Router();

//llama a las funciones
router.get("/all", MonedaController.getAllCryptos);


export default router;
module.exports = router;
