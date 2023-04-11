import { connect } from "../config/server.config";
import { MonedaPojo } from "../models/moneda.model";
import { QueryTypes } from "sequelize";

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

  async getCoinById(cripto_id: string): Promise<MonedaPojo> {
    try {
      return await this._coinRepository.findByPk(cripto_id);
    } catch (error) {
      console.error("Error recuperando monedas en repository");
      console.error(error);
      return null;
    }
  }

  async updatestock(cripto_id: string, newStock: number): Promise<any> {
    try {
      const stockCoin = await this._database.sequelize.query(
        "UPDATE monedas SET stock =? WHERE cripto_id = ?;",
        {
          replacements: [newStock, cripto_id],
          type: QueryTypes.UPDATE,
        }
      );

      console.log("Actualizando stock de monedas en repository");
      return stockCoin;
    } catch (error) {
      console.error(
        "Se ha producido un error al Actualizar stock en repository"
      );
      console.error(error);
      return null;
    }
  }
}
