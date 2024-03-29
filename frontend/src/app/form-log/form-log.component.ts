import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../services/data-base.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/User.interface';

@Component({
  selector: 'app-form-log',
  templateUrl: './form-log.component.html',
  styleUrls: ['./form-log.component.scss'],
})
export class FormLogComponent implements OnInit {
  userLog: User; //guarda el usuario que devuelve la funcion loginUser()
  mensajeErrorLog: string; //mensaje si hay error al loguearse

  constructor(
    private dataBaseService: DataBaseService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  loginUser(username: string, password: string) {
    //console.log('username ' + username);
    //console.log('password ' + password);

    this.dataBaseService.getUserLog(username, password).subscribe(
      (user) => {
        // Si se inicia sesión correctamente, haz algo con el usuario devuelto
        //console.log(user);
        //console.log('bien');
        this.userLog = user;
        localStorage.setItem('nombre', username);
        localStorage.setItem('user_id', this.userLog.user_id);
        localStorage.setItem('deposit', user.deposit.toString());

        this.redireccionAtabla();
      },
      (error) => {
        console.log(error);
        console.log('mal');
      }
    );
    if (
      localStorage.getItem('nombre') != '' &&
      localStorage.getItem('nombre') != null
    ) {
      this.mensajeErrorLog = '';
    } else {
      this.mensajeErrorLog = 'El usuario o la contraseña no son correctos';
    }
  }

  redireccionAtabla() {
    console.log('redireccion a tabla');
    this.router.navigate(['tabla']);
  }

  redireccionRegistro() {
    console.log('redireccionRegistro');
    this.router.navigate(['registro']);
  }
}
