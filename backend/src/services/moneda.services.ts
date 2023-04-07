import { MonedaPojo } from "../data/models/moneda.model";
import { MonedaRepository } from "../data/repositories/moneda.repository";
import { MonedaDto } from "../types";

export class MonedaService {
  _coinRepository: MonedaRepository;

  constructor() {
    this._coinRepository = new MonedaRepository();
  }

  async getAllCryptos(): Promise<MonedaDto[]> {
    const cryptoPromise = await this._coinRepository
      .getAllCryptos()
      .then((result) => {
        let cryptoAsDto: MonedaDto[] = [];
        result.forEach((cryptoAsPojo) => {
          let userAsDto = this.parsePojoIntoDto(cryptoAsPojo);
          cryptoAsDto.push(userAsDto);
        });
        console.log("Obyeniendo monedas desde services");

        return cryptoAsDto;
      })
      .catch((error) => {
        console.error("Obyeniendo monedas desde services");
        console.error(error);
        throw error;
      });
    return cryptoPromise;
  }

  parsePojoIntoDto(cryptoPojo: MonedaPojo): MonedaDto {
    const cryptoDto: MonedaDto = {
      cripto_id: cryptoPojo.cripto_id,
      cripto_name: cryptoPojo.cripto_name,
      value: cryptoPojo.value,
      icon: cryptoPojo.icon,
      asset: cryptoPojo.asset,
      stock: cryptoPojo.stock,
    };

    return cryptoDto;
  }
}
