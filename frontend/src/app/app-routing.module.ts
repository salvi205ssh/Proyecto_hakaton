import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLogComponent } from './form-log/form-log.component';

const routes: Routes = [
  { path: 'login', component: FormLogComponent },
  { path: '', component: FormLogComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
