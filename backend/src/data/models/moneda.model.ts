import { NUMBER, STRING } from "sequelize";
import { Table, Column, Model } from "sequelize-typescript";

@Table({
  freezeTableName: true,
  schema: "public",
  tableName: "monedas",
  createdAt: false,
  updatedAt: false,
})
export class MonedaPojo extends Model {
  @Column({
    primaryKey: true,
    type: STRING,
    field: "cripto_id",
  })
  cripto_id: string;

  @Column({
    type: STRING,
    field: "cripto_name",
  })
  cripto_name: string;

  @Column({
    type: NUMBER,
    field: "value",
  })
  value: number;

  @Column({
    type: STRING,
    field: "icon",
  })
  icon: string;

  @Column({
    type: STRING,
    field: "asset",
  })
  asset: string;

  @Column({
    type: NUMBER,
    field: "stock",
  })
  stock: number;

  createdAt: Date;

  updateAt: Date;
}
