import { Component } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private router: Router){

  }

    onLogout(){
      alert('logout process...');
      this.router.navigate(['']); //goto default route //login
    }
  }