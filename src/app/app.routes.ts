import { Routes } from '@angular/router';
import { LoginComponent } from './module/login/login.component';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { NavbarComponent } from './module/navbar/navbar.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  //เพิ่มใหม่
  { path: 'dashboard', component: DashboardComponent },
  { path: 'navbar', component: NavbarComponent },
];
