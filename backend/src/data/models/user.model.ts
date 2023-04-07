import { NUMBER, STRING } from "sequelize";
import { Table, Column, Model } from "sequelize-typescript";

@Table({
  freezeTableName: true,
  schema: "public",
  tableName: "users",
  createdAt: false,
  updatedAt: false,
})
export class UserPojo extends Model {
  @Column({
    primaryKey: true,
    type: STRING,
    field: "user_id",
  })
  user_id: string;

  @Column({
    type: STRING,
    field: "username",
  })
  username: string;

  @Column({
    type: STRING,
    field: "password",
  })
  password: string;

  @Column({
    type: STRING,
    field: "fullname",
  })
  fullname: string;

  @Column({
    type: STRING,
    field: "birthdate",
  })
  birthdate: string;

  @Column({
    type: NUMBER,
    field: "deposit",
  })
  deposit: number;

  createdAt: Date;

  updateAt: Date;
}
