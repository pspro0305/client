import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_Services/account.service';
import { HomeComponent } from "./home/home.component";
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  //Dependency Injection to call APIs
  http = inject(HttpClient); 
  private accountService = inject(AccountService);
  users: any;

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userstring = localStorage.getItem('user');
    if(!userstring){
      return;
    }
    const user = JSON.parse(userstring);
    this.accountService.currentUser.set(user);

  }
  
}
