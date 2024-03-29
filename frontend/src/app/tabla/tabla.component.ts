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
  //idCoinLog: string = '';
  //valueCoin: any;
  newDeposit: number = 0; //Guarda el valor del nuevo deposito de updateDposit()
  deposit: any;  //Guarda el valor de deposit del navbar
  //suficienteDinero = true;
  mensaje: string = ''; //Mensaje de error si no hay stock o no queda dinero

  coins: Moneda[] = []; //Array de las monedas de la tabla para comprar monedas
  cryptosUser: CryptosUser[] = [];  //Array de las monedas de el usuario logueado

  constructor(
    private router: Router,
    private loginService: LoginService,
    private dataBaseService: DataBaseService
  ) {}

  ngOnInit(): void {
    this.nombreUserLog = this.loginService.getUserLogin();
    this.idUserLog = this.loginService.getIdUserLogin();
    this.deposit = parseFloat(localStorage.getItem('deposit') || '');
    //this.deposit = JSON.parse(localStorage.getItem('deposit'));
    this.cargarTabla();
  }

  cargarTabla() {
    //console.log('LLenando arrays');
    this.dataBaseService.getCryptos().subscribe((data) => {
      // console.log('coin', data);
      this.coins = data;
    });

    this.dataBaseService
      .getTable(localStorage.getItem('user_id') || '')
      .subscribe((data) => {
        //console.log('coin', data);
        this.cryptosUser = data;
        this.deposit = data[0]?.deposit;
      });
  }

  cerrarSesion() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  deshabilitaBoton(id: string): boolean {
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

    //console.log('deposit en buycon', this.deposit);

    //modifica el deposit, inserta una fila en wallet y resta uno al stock
    this.dataBaseService
      .getCoinById(newCoin.cripto_id)
      .subscribe((Response) => {
        //console.log('valueCoin1: ' + Response.value);

        if (this.deposit < Response.value) {
          //console.log('No tiene suficiente dinero');
          this.mensaje = 'No tiene suficiente dinero';
        } else {
          this.mensaje = '';

          console.log('buyCoin ');
          this.dataBaseService.InsertWallet(newCoin).subscribe(
            (response) => {
              //console.log('Coin added successfully', response);
              //console.log('newCoin.cripto_id: ' + newCoin.cripto_id);

              this.cargarTabla();
            },
            (error) => {
              //console.error('Error adding coin', error);
            }
          );

          this.newDeposit = +this.cryptosUser[0].deposit - +Response.value;
          const newStock = Response.stock - 1;
          this.updateDeposit(this.idUserLog, this.newDeposit);
          this.updateStock(newCoin.cripto_id, newStock);
        }
      });
  }

  updateStock(cripto_id: string, newStock: number) {
    this.dataBaseService.updatestock(cripto_id, newStock).subscribe(
      (Response) => {
        //console.log('Stock actualizado', Response);
      },
      (error) => {
        //console.error('Error actualizando stock', error);
      }
    );
  }

  updateDeposit(user_id: string, costeMoneda: number) {
    this.dataBaseService.updateDeposit(user_id, costeMoneda).subscribe(
      (Response) => {
        console.log('deposit actualizado', Response);
      },
      (error) => {
        console.error('Error actualizando deposit', error);
      }
    );
  }

  comprarMasMonedas(newAmount: number, user_id: string, cripto_id: string) {
    /* console.log('user_id: ', user_id);
    console.log('cripto_id: ', cripto_id);
    console.log('newAmount: ', newAmount); */
    const newValue = newAmount + 1;
    //console.log('newAmount: ', newAmount);

    this.dataBaseService.getCoinById(cripto_id).subscribe((result) => {
      if (this.cryptosUser[0].deposit < result.value || result.stock < 1) {
        //console.log('No tiene suficiente dinero');

        this.mensaje = 'No tiene suficiente dinero o no queda stock';
      } else {
        this.mensaje = '';

        this.newDeposit = +this.cryptosUser[0].deposit - +result.value;
        const newStock = result.stock - 1;

        this.updateDeposit(this.idUserLog, this.newDeposit);
        this.updateStock(cripto_id, newStock);

        this.dataBaseService
          .updateAmount(newValue, user_id, cripto_id)
          .subscribe(
            (response) => {
              console.log('Amount aumentado', response);
              this.cargarTabla();
            },
            (error) => {
              console.error('Error actualizando amount', error);
            }
          );

        this.cargarTabla();
      }
    });
  }

  //Todo: venderMoneda
  venderMoneda(newAmount: number, user_id: string, cripto_id: string) {
    /* console.log('user_id: ', user_id);
    console.log('cripto_id: ', cripto_id);
    console.log('newAmount: ', newAmount); */
    const newValue = newAmount - 1;
    //console.log('newAmount: ', newAmount);

    this.dataBaseService.getCoinById(cripto_id).subscribe((result) => {
      if (newValue <1) {
        //console.log('No tiene suficiente dinero');
        this.mensaje = 'No tienes mas monedas para vender';
      } else {
        this.mensaje = '';
        const deposit = Number(this.cryptosUser[0].deposit).toFixed(2);
        /*         console.log('deposit: ', typeof this.cryptosUser[0].deposit);
        console.log('depositParse: ', deposit);
        console.log('depositType: ', typeof deposit);
        console.log('valor: ',result.value) */

        this.newDeposit = +this.cryptosUser[0].deposit + +result.value;

        const newStock = result.stock + 1;
        //console.log('newDeposit1: '+this.newDeposit)

        this.updateDeposit(this.idUserLog, this.newDeposit);
        this.updateStock(cripto_id, newStock);
        //console.log('newDeposit2: ', this.newDeposit)
        this.dataBaseService
          .updateAmount(newValue, user_id, cripto_id)
          .subscribe(
            (response) => {
              console.log('Amount aumentado', response);
              this.cargarTabla();
            },
            (error) => {
              console.error('Error actualizando amount', error);
            }
          );

        this.cargarTabla();
      }
    });
  }
}
