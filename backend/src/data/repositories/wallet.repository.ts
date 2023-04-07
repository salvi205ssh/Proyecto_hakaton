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
}
