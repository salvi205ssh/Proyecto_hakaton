import { Sequelize } from "sequelize-typescript";
import { UserPojo } from "../models/user.model";
import { MonedaPojo } from "../models/moneda.model";
import { WalletPojo } from "../models/wallet.model";

export const connect = () => {
  const DB_HOSTNAME = "localhost";
  const DB_PORT = 5432;
  const DB_NAME = "criptodivisas";
  const DB_USERNAME = "postgres";
  const DB_PASSWORD = "M@rte2025";
  const DB_SCHEMA = "public";
  const DB_DIALECT: any = "postgres";

  const dbConfig = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOSTNAME,
    dialect: DB_DIALECT,
    schema: DB_SCHEMA,
    port: DB_PORT,
    repositoryMode: true,
    pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 5000,
    },
  });

  dbConfig.addModels([UserPojo, MonedaPojo, WalletPojo]);

  const db: any = {};
  db.Sequelize = Sequelize;
  db.sequelize = dbConfig;

  return db;
};
