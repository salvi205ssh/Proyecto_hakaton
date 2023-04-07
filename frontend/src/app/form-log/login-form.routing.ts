import { Routes, RouterModule } from '@angular/router';
import { TablaComponent } from '../tabla/tabla.component';

const routes: Routes = [
  { path: 'tabla', component: TablaComponent },
];

export const LoginFormRoutes = RouterModule.forChild(routes);
