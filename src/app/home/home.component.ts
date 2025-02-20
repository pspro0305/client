import { Component, inject } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    http = inject(HttpClient); 
  registerMode = false;
  users: any;

  ngonInit(){
    this.getUsers();
  }
  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }
  registerToggle(){
    this.registerMode = !this.registerMode;
  }
  
  getUsers(){
    //We need to call http get service and add subscribe to our Observable
    this.http.get('https://localhost:5001/api/users').subscribe({
     next : respose=> this.users=respose,
     error : error=>console.log(error),
     complete : ()=> console.log('Request is completed')
         });
 }
}
