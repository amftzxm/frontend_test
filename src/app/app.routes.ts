import { Routes } from '@angular/router';
import { LoginComponent } from './module/login/login.component';
import { DashboardComponent} from './module/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '**', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },

  //เพิ่มใหม่
  { path: 'dashboard', component:  DashboardComponent},
];


