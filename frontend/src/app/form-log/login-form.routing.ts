import { Routes, RouterModule } from '@angular/router';
import { TablaComponent } from '../tabla/tabla.component';
import { FormRegistroComponent } from '../form-registro/form-registro.component';
import { NoLoginGuard } from '../guards/no-login.guard';

const routes: Routes = [
  { path: 'tabla', component: TablaComponent, canActivate:[NoLoginGuard],canLoad:[NoLoginGuard] },
  { path: 'registro', component: FormRegistroComponent },

];

export const LoginFormRoutes = RouterModule.forChild(routes);
