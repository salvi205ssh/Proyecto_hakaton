import { Routes, RouterModule } from '@angular/router';
import { TablaComponent } from '../tabla/tabla.component';
import { FormRegistroComponent } from '../form-registro/form-registro.component';

const routes: Routes = [
  { path: 'tabla', component: TablaComponent },
  { path: 'registro', component: FormRegistroComponent },

];

export const LoginFormRoutes = RouterModule.forChild(routes);
