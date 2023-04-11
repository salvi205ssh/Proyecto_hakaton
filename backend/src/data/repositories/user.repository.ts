import { connect } from "../config/server.config";
import { UserPojo } from "../models/user.model";
import { v4 as uuid } from "uuid";
import { QueryTypes } from "sequelize";

export class UserRepository {
  _database: any = {};
  _userRepository: any;

  constructor() {
    this._database = connect();
    this._userRepository = this._database.sequelize.getRepository(UserPojo);
  }

  async addUser(newUser: UserPojo): Promise<UserPojo> {
    try {
      newUser.user_id = uuid();
      newUser = await this._userRepository.create(newUser);
      console.log("añadiendo user en repository");

      return newUser;
    } catch (error) {
      console.error(
        "Se ha producido un error al insertar usuario en repository"
      );
      console.error(error);
      return null;
    }
  }

  async getLogin(username: string, password: string): Promise<UserPojo> {
    let user: UserPojo = {} as UserPojo;
    try {
      console.log("haciendo login en repository");
      return await this._userRepository.findOne({
        where: { username: username, password: password },
      });
    } catch (error) {
      console.error("Se ha producido un error al hacer en repository");
      console.error(error);
      throw error;
    }
    return user;
  }

  async getAllCryptosUser(user_id: string): Promise<any[]> {
    try {
      /*
      SELECT users.user_id, monedas.cripto_id, users.deposit, monedas.asset, monedas.icon, monedas.cripto_name, monedas.value, monedas.stock, wallet.amount 
      FROM users JOIN wallet ON users.user_id = wallet.user_id 
      JOIN monedas ON wallet.cripto_id = monedas.cripto_id 
      WHERE users.user_id ='6518e8f0-862e-4cef-8b81-519b10075e34'
      */

      /*       const coinsUser = await this._database.models.User.findAll({
        
        where: { user_id },
        include: [
          {
            model: this._database.models.Wallet,
            attributes: ['amount'],
            include: [
              {
                model: this._database.models.Cripto,
                attributes: ['cripto_id', 'asset', 'icon', 'cripto_name', 'value', 'stock'],
              },
            ],
          },
        ],
        attributes: ['user_id', 'deposit'],
      }); */

      const coinsUser = await this._database.sequelize.query(
        "SELECT users.user_id, monedas.cripto_id, users.deposit, monedas.asset, monedas.icon, monedas.cripto_name, monedas.value, monedas.stock, wallet.amount FROM users JOIN wallet ON users.user_id = wallet.user_id JOIN monedas ON wallet.cripto_id = monedas.cripto_id WHERE users.user_id =?",
        {
          replacements: [user_id],
          type: QueryTypes.SELECT,
        }
      );

      console.log("obteniendo cryptos de users en repository");
      return coinsUser;
    } catch (error) {
      console.error(
        "Se ha producido un error al recuperar las cryptos en repository"
      );
      console.error(error);
      return [];
    }
  }

  async updateDeposit(newDeposit: number, user_id: string): Promise<any> {
    try {
      const coinsUser = await this._database.sequelize.query(
        "UPDATE public.users SET deposit=? WHERE user_id=?",
        {
          replacements: [newDeposit, user_id],
          type: QueryTypes.UPDATE,
        }
      );

      console.log("Actualizando deposit de usuarios en repository");
      return coinsUser;
    } catch (error) {
      console.error(
        "Se ha producido un error al Actualizar deposit en repository"
      );
      console.error(error);
      return null;
    }
  }
}
