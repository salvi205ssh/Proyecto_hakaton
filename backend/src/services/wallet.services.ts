import { WalletPojo } from "./../data/models/wallet.model";
import { WalletRepository } from "../data/repositories/wallet.repository";
import { WalletDto } from "../types";

export class WalletService {
  _walletRepository: WalletRepository;

  constructor() {
    this._walletRepository = new WalletRepository();
  }

  async addToWallet(wallet: WalletDto): Promise<WalletDto> {
    const walletPojo: WalletPojo = this.parseDtoIntoPojo(wallet);

    const broPromise = await this._walletRepository
      .addToWallet(walletPojo)
      .then((wallet) => {
        console.log("comprando monedas en service");

        return wallet as WalletDto;
      })
      .catch((error) => {
        console.error(error);
        console.log("Error comprando monedas en service");

        throw error;
      });

    return broPromise;
  }

  parseDtoIntoPojo(walletDto: WalletDto): WalletPojo {
    return walletDto as WalletPojo;
  }
}
