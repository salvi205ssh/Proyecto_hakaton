export class UserDto {
  user_id: string;
  username: string;
  password: string;
  fullname: string;
  birthdate: string;
  deposit: number;
}

export class MonedaDto {
  cripto_id: string;
  cripto_name: string;
  value: number;
  icon: string;
  asset: string;
  stock: number;
}

export class WalletDto {
  user_id: string;
  cripto_id: string;
  amount: number;
}

//export type NewUserDto = Omit<UserDto, "userId">;
