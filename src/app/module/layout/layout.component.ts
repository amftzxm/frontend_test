import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../../layout/nav-bar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavBarComponent,RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
