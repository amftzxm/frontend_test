import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatSidenavModule, DashboardComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
