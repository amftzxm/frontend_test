import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent {
  username: any;
  password: any;

  private login_url = 'http://localhost:3000/login';
  private ip_url = 'https://api.ipify.org/?format=json';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  //test function bind with html

    onLoginButtonClick(): void {
      console.log(this.username)
      console.log(this.password)

      this.authService.login(this.username, this.password).subscribe(
        (response) => {
            // Handle successful login
            console.log(response);
        },
        (error) => {
            // Handle error
            console.log(error)
        }
    );
}
//     onLoginButtonClick(): void {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     this.http.post(this.login_url, { username: this.username, password: this.password }, { headers })
//         .subscribe(
//             (response: any) => {
//                 localStorage.setItem('token', response.token); // Save token
//                 //this.router.navigate(['/dashboard']); // Redirect to dashboard
//             },
//             (error) => {
//                 console.log(error);
//             }
//         );
// }

    // alert('login processing...');
    // this.router.navigate(['home/child-a']);
  }
