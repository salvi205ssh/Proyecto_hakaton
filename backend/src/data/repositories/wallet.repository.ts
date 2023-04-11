import { QueryTypes } from 'sequelize';
import { WalletPojo } from "./../models/wallet.model";
import { connect } from "../config/server.config";

export class WalletRepository {
  _database: any = {};
  _walletRepository: any;

  constructor() {
    this._database = connect();
    this._walletRepository = this._database.sequelize.getRepository(WalletPojo);
  }

  async addToWallet(newWallet: WalletPojo): Promise<WalletPojo> {
    try {
      newWallet = await this._walletRepository.create(newWallet);
      console.log("comprando monedas en repository");

      return newWallet;
    } catch (error) {
      console.error("Error comprando monedas en repository");
      console.error(error);
      return null;
    }
  }

  async updateAmount(newAmount: number, user_id: string , cripto_id: string): Promise<any> {
    try {
      if (!newAmount || !user_id || !cripto_id) {
        throw new Error("Faltan argumentos para actualizar amount en wallet");
      }
      const newValue = await this._database.sequelize.query(
        "UPDATE public.wallet SET amount=? WHERE user_id=? and cripto_id=?",
        {
          replacements: [newAmount, user_id, cripto_id],
          type: QueryTypes.UPDATE,
        }
      );

      console.log("Actualizando amount de wallet en repository");
      return newValue;
    } catch (error) {
      console.error(
        "Se ha producido un error al Actualizar amount en repository"
      );
      console.error(error);
      return null;
    }
  }
}
