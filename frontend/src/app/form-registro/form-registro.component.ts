import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataBaseService } from '../services/data-base.service';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss'],
})
export class FormRegistroComponent implements OnInit {
  IqualPassword: boolean;
  edad: number;
  MensajeError: string;
  constructor(
    private dataBaseService: DataBaseService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const cumpleanos = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const mes = hoy.getMonth() - cumpleanos.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    return edad;
  }

  registro(
    username: string,
    password: string,
    password2: string,
    fullname: string,
    birthdate: string,
    deposit: number
  ): void {
    const newUser = {
      username: username,
      password: password,
      password2: password2,
      fullname: fullname,
      birthdate: birthdate,
      deposit: deposit,
    };

    this.IqualPassword = password === password2;

    console.log('IqualPassword' + this.IqualPassword);

    this.edad = this.calcularEdad(birthdate);
    console.log('La edad del usuario es: ' + this.edad);

    const camposVacios: boolean =
      !username.length ||
      !password.length ||
      !fullname.length ||
      birthdate == '' ||
      deposit == 0;

    //console.log('validacion_de_campos ' + camposVacios);
    if (this.edad >= 18 && !camposVacios && this.IqualPassword) {
      console.log('El usuario es mayor de edad');
      this.dataBaseService.InsertUser(newUser).subscribe(
        (response) => {
          console.log('User added successfully', response);

          localStorage.setItem('nombre', response.username);
          localStorage.setItem('user_id', response.user_id);
          this.router.navigate(['login']);

          //this.loginUser(response.username, response.password);
        },
        (error) => {
          console.error('Error adding user', error);
        }
      );
    } else {
      
      this.MensajeError = 'Hay errores en el formulario, Asegurate de haber rellenado todos los campos, de que las contraseñas sean iguales y de tener mas de 18 años ';
    }
    //TODO: mas de 18, nombre lleno,
  }

  salir() {
    this.router.navigate(['login']);
  }
}
