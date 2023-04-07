import { connect } from "../config/server.config"
import { MonedaPojo } from "../models/moneda.model";

export class MonedaRepository {
  _database: any = {};
  _coinRepository: any;

  constructor() {
    this._database = connect();
    this._coinRepository = this._database.sequelize.getRepository(MonedaPojo);
  }

  async getAllCryptos(): Promise<MonedaPojo[]> {
    try {
      const monedas = await this._coinRepository.findAll();
      console.log("recuperando monedas en repository");
      return monedas;
    } catch (error) {
      console.error("Error recuperando monedas en repository");
      console.error(error);
      return [];
    }
  }
}
