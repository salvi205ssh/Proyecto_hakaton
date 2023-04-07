import { NUMBER, STRING } from "sequelize";
import { Table, Column, Model } from "sequelize-typescript";

@Table({
  freezeTableName: true,
  schema: "public",
  tableName: "wallet",
  createdAt: false,
  updatedAt: false,
})
export class WalletPojo extends Model {
  @Column({
    type: STRING,
    field: "user_id",
  })
  user_id: string;

  @Column({
    primaryKey: true,
    type: STRING,
    field: "cripto_id",
  })
  cripto_id: string;

  @Column({
    type: NUMBER,
    field: "amount",
  })
  amount: number;

  createdAt: Date;

  updateAt: Date;
}
