import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: any;
  password: any;

  private http = inject(HttpClient);



  constructor(){
    this.http.get<any>('https://official-joke-api.appspot.com/random_joke').subscribe((res)=>{
      console.log(res);

    })
  }
}
