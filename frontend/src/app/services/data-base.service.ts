import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CryptosUser, User } from '../interfaces/User.interface';
import { Moneda } from '../interfaces/moneda.interface';
import { Wallet } from '../interfaces/wallet.interface';

@Injectable({
  providedIn: 'root',
})
export class DataBaseService {
  constructor(private http: HttpClient) {}

  getUserLog(username: string, password: string): Observable<User> {
    //console.log('Obteniendo al usuario logueado');
    return this.http.get<User>(
      'http://localhost:3000/users/login/' + username + '/' + password
    );
  }

  getCryptos(): Observable<Moneda[]> {
    // console.log('Obteniendo tabla de criptomonedas');
    return this.http.get<Moneda[]>('http://localhost:3000/monedas/all/');
  }

  InsertWallet(wallet: any): Observable<Wallet> {
    //console.log('comprando moneda');
    return this.http.post<Wallet>('http://localhost:3000/wallet/add', wallet);
  }

  InsertUser(user: any): Observable<User> {
    //console.log('insertando usuario');
    return this.http.post<User>('http://localhost:3000/users/add', user);
  }

  getAllUserNames(): Observable<User[]> {
    //console.log('Obteniendo todos los usuarios')
    return this.http.get<User[]>('http://localhost:3000/users/all');
  }

  getTable(user_id: string): Observable<CryptosUser[]> {
    //console.log('Obteniendo todas las monedas de un usuario')
    return this.http.get<CryptosUser[]>(
      'http://localhost:3000/users/getTable/' + user_id
    );
  }

  getCoinById(cripto_id: string): Observable<Moneda> {
    //console.log('Obteniendo monedas por su id')
    return this.http.get<Moneda>(
      'http://localhost:3000/monedas/getCoinById/' + cripto_id
    );
  }

  updatestock(cripto_id: string, newStock: number): Observable<any> {
    // console.log('Actualizando stock de moneda');
    const url = `http://localhost:3000/monedas/updatestock/${cripto_id}/${newStock}`;
    return this.http.put<any>(url, null);
  }

  updateDeposit(user_id: string, costeMoneda: number): Observable<any> {
    //console.log('Actualizando deposit de moneda');
    const url = `http://localhost:3000/users/updateDeposit/${user_id}/${costeMoneda}`;
    return this.http.put<any>(url, null);
  }

  updateAmount(
    newAmount: number,
    user_id: string,
    cripto_id: string
  ): Observable<any> {
    //console.log('Actualizando amount de wallet');
    const url = `http://localhost:3000/wallet/updateAmount/${newAmount}/${user_id}/${cripto_id}`;
    return this.http.put<any>(url, null);
  }
}
