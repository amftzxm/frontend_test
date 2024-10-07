import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private router: Router) {}

  
  title = 'frontend_test';

  message = 'this just a simple alert message from main app component, for change a page by call a routing...!';

  onButtonClick(){
    // alert(this.message);
    this.router.navigate(['dashboard']);
  }
}
