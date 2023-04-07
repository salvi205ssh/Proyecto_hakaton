import { Component, OnInit } from '@angular/core';
import { Moneda } from '../interfaces/moneda.interface';
import { Router } from '@angular/router';
import { DataBaseService } from '../services/data-base.service';
import { LoginService } from '../services/login.service';
import { CryptosUser } from '../interfaces/User.interface';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent implements OnInit {
  nombreUserLog: string = '';
  idUserLog: string = '';
  idCoinLog: string = '';
  coins: Moneda[] = [];
  cryptosUser: CryptosUser[] = [];

  constructor(
    private router: Router,
    private LoginService: LoginService,
    private dataBaseService: DataBaseService
  ) {}

  ngOnInit(): void {
    this.nombreUserLog = localStorage.getItem('nombre') || '';
    this.idUserLog = localStorage.getItem('user_id') || '';

    //console.log('LLenando arrays');
    this.dataBaseService.getCryptos().subscribe((data) => {
      // console.log('coin', data);
      this.coins = data;
    });

  this.cargarTabla();
  }

  cargarTabla(){
    this.dataBaseService
    .getTable(localStorage.getItem('user_id') || '')
    .subscribe((data) => {
      console.log('coin', data);
      this.cryptosUser = data;
    });
  }
  cerrarSesion() {
    this.LoginService.logout();
    this.router.navigate(['login']);
  }

  checkName(id: string): boolean {
    //console.log('dentro de checkname ');

    for (let i = 0; i < this.cryptosUser.length; i++) {
      //console.log('name ', name);
      //console.log('cryptoNmae', this.cryptosUser[i].cripto_id);

      if (this.cryptosUser[i].cripto_id == id) {
       // console.log('dentro del if ');

        return true;
      }
    }

    return false;
  }

  buyCoin(crypto_id: string): void {
    
    const newCoin = {
      user_id: this.idUserLog,
      cripto_id: crypto_id,
      amount: 1,
    };

    console.log('buyCoin ');
    this.dataBaseService.InsertWallet(newCoin).subscribe(
      (response) => {
        console.log('Coin added successfully', response);
  
        this.cargarTabla();
        //Todo: restar del deposit y de cantidad al comprar
      },
      (error) => {
        console.error('Error adding coin', error);
      }
    );
  }
}
