export interface User {
  user_id: string;
  username: string;
  password: string;
  fullname: string;
  birthdate: string;
  deposit: number;
}

export class CryptosUser {
    user_id: string;
    cripto_id: string;
    asset: string;
    icon: string;
    cripto_name: string;
    value: number;
    stock: number;
    amount: number;
    deposit: number;
  }