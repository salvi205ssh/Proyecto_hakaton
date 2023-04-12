import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataBaseService } from '../services/data-base.service';
import { User } from '../interfaces/User.interface';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss'],
})
export class FormRegistroComponent implements OnInit {
  IqualPassword: boolean;
  edad: number; //Guarda el calculo de la edad en años
  MensajeError: string; //Guarda el mensaje de errores en el formulario
  MensajeErrorUserName: string; //Guarda el mensaje, El usuario ya existe
  userNames: User[] = []; //array de userNames para comprobar que el usuario insertado en login no se repita
  encontrado: boolean; //guarda true si se repite el username

  constructor(
    private dataBaseService: DataBaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataBaseService.getAllUserNames().subscribe((data) => {
      this.userNames = data;
    });
  }

  /*
    Función para calcular la edad a partir de una fecha de nacimiento.
    La edad calculada en años.
   */
  calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date(); // Fecha actual
    const cumpleanos = new Date(fechaNacimiento); // Fecha de nacimiento
    let edad = hoy.getFullYear() - cumpleanos.getFullYear(); // Calcular la diferencia de años
    const mes = hoy.getMonth() - cumpleanos.getMonth(); // Calcular la diferencia de meses
    if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
      // Si el mes actual es menor al mes de nacimiento, o si están en el mismo mes pero el día actual es menor al día de nacimiento
      edad--; // Restar un año a la edad
    }
    return edad; // Devolver la edad calculada
  }

  //----------------------------------------------------------------
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

    //console.log('IqualPassword' + this.IqualPassword);

    this.edad = this.calcularEdad(birthdate);
    console.log('La edad del usuario es: ' + this.edad);

    const camposVacios: boolean =
      !username.length ||
      !password.length ||
      !fullname.length ||
      birthdate == '' ||
      deposit == 0;

    const encontrado =
      this.userNames.find((user) => user.username === username) !== undefined;
    console.log('encontrado: ' + encontrado);

    if (encontrado) {
      this.MensajeErrorUserName = 'Ese usuario ya existe';
    }
    //console.log('validacion_de_campos ' + camposVacios);
    if (
      this.edad >= 18 &&
      !camposVacios &&
      this.IqualPassword &&
      encontrado === false //falla
    ) {
      console.log('El usuario ' + username + ' es mayor de edad');
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
      this.MensajeError =
        'Hay errores en el formulario, Asegurate de haber rellenado todos los campos, de que las contraseñas sean iguales y de tener mas de 18 años ';
    }
  }

  // Fin de funcion registro()
  //----------------------------------------------------------------

  salir() {
    this.router.navigate(['login']);
  }
}
