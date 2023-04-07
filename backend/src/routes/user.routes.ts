import express from "express";
import { UserController } from "../controllers/user.controller";

const router = express.Router();

//llama a las funciones

//router.post("/add", UserController.addUser); 
router.get("/login/:username/:password", UserController.getUserByLogin);
router.get("/getTable/:user_id", UserController.getAllCryptosUser);

export default router;
module.exports = router;
