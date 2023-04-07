import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  getUserLogin() {
    return localStorage.getItem('nombre') || '';
  }

  getIdUserLogin() {
    return localStorage.getItem('user_id') || '';
  }

  logout() {
    console.log('logout');
    return localStorage.removeItem('nombre');
  }
}
