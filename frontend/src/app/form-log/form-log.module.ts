import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLogComponent } from './form-log.component';
import { FormsModule } from '@angular/forms';
import { LoginFormRoutes } from './login-form.routing';

@NgModule({
  declarations: [FormLogComponent],
  imports: [CommonModule, FormsModule, LoginFormRoutes],
})
export class FormLogModule {}
