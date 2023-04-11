import { UserPojo } from "../data/models/user.model";
import { UserDto } from "../types";
import { UserRepository } from "./../data/repositories/user.repository";
export class UserService {
  _userRepository: UserRepository;

  constructor() {
    this._userRepository = new UserRepository();
  }

  async addUser(user: UserDto): Promise<UserDto> {
    const userPojo: UserPojo = this.parseDtoIntoPojo(user);

    const userPromise = await this._userRepository
      .addUser(userPojo)
      .then((user) => {
        console.log("añadiendo user en service");

        return user as UserDto;
      })
      .catch((error) => {
        console.error(error);
        console.error("ERROR añadiendo user en service");

        throw error;
      });

    return userPromise;
  }

  async getLogin(username: string, password: string): Promise<UserDto> {
    const usersPromise = await this._userRepository
      .getLogin(username, password)
      .then((result) => {
        if (!result) {
          return undefined;
        }

        return this.parsePojoIntoDto(result);
      })
      .catch((error) => {
        console.error("Error al recuperar usuarios");
        console.error(error);
        throw error;
      });
    return usersPromise;
  }

  async getAllCryptosUser(user_id: string): Promise<any[]> {
    const usersPromise = await this._userRepository
      .getAllCryptosUser(user_id)
      .then((result) => {
        let usersAsDto: any[] = [];
        result.forEach((usersAsPojo) => {
          let userAsDto = usersAsPojo;
          usersAsDto.push(userAsDto);
        });
        console.log("obteniendo monedas de users en service");

        return usersAsDto;
      })
      .catch((error) => {
        console.error("ERROR obteniendo monedas de users en service");
        console.error(error);

        throw error;
      });
    return usersPromise;
  }

  async updateDeposit(costeMoneda: number, user_id: string): Promise<any> {
    const usersPromise = await this._userRepository
      .updateDeposit(costeMoneda, user_id)
      .then((result) => {
        console.log("Actualizando deposit de users en service");

        return result;
      })
      .catch((error) => {
        console.error("ERROR Actualizando deposit de users en service");
        console.error(error);

        throw error;
      });
    return usersPromise;
  }

  async getAllUsers(): Promise<UserDto[]> {
    const usersPromise = await this._userRepository
      .getAllUsers()
      .then((usersAsPojo) => {
        let usersAsDto: UserDto[] = [];
        usersAsPojo.forEach((usersAsPojo) => {
          let userAsDto = this.parsePojoIntoDto(usersAsPojo);
          usersAsDto.push(userAsDto);
        });
        return usersAsDto;
      })
      .catch((error) => {
        console.error("Error al recuperar usuarios");
        console.error(error);
        throw error;
      });
    return usersPromise;
  }

  parsePojoIntoDto(userPojo: UserPojo): UserDto {
    const userDto: UserDto = {
      user_id: userPojo.user_id,
      username: userPojo.username,
      password: userPojo.password,
      fullname: userPojo.fullname,
      birthdate: userPojo.birthdate,
      deposit: userPojo.deposit,
    };
    return userDto;
  }

  parseDtoIntoPojo(userDto: UserDto): UserPojo {
    return userDto as UserPojo;
  }
}
