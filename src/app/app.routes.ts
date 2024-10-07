import { Routes } from '@angular/router';
import { LoginComponent } from './module/login/login.component';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { NavbarComponent } from './module/navbar/navbar.component';
import { LayoutComponent } from './module/layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  //เพิ่มใหม่
  {
    path: 'home',
    component: LayoutComponent,
    children: [{ path: 'child-a', component: DashboardComponent }],
  },

  { path: 'navbar', component: NavbarComponent },
];
