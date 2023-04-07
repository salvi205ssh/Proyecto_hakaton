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

  // Método que devuelve un observable con todos los cómics
  getUserLog(username: string, password: string): Observable<User> {
    // Hacemos una petición GET a la URL del servidor local
    return this.http.get<User>(
      'http://localhost:3000/users/login/' + username + '/' + password
    );
  }

  getCryptos(): Observable<Moneda[]> {
   // console.log('service de getCryptos');

    // Hacemos una petición GET a la URL del servidor local
    return this.http.get<Moneda[]>('http://localhost:3000/monedas/all/');
  }

  InsertWallet(wallet: any): Observable<Wallet> {
    //console.log('comprando moneda');
    return this.http.post<Wallet>('http://localhost:3000/wallet/add', wallet);
  }

  //Todo: insertar usuario
  /*     InsertUser(user: any): Observable<User> {
      return this.http.post<User>('http://localhost:3000/api/users/add', user);
    } */

  getTable(user_id: string): Observable<CryptosUser[]> {
    // Hacemos una petición GET a la URL del servidor local
    return this.http.get<CryptosUser[]>(
      'http://localhost:3000/users/getTable/' + user_id
    );
  }
}
