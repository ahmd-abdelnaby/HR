import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/Services/auth.service'
import { IUser } from 'src/app/Data_Types/iuser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:IUser;
  constructor(private authService: AuthService,private router : Router) { 
    this.user = { email: '', username: '', password: '' }
  }

  ngOnInit(): void {
  }

  onSubmit(event)
  {
    console.log(this.user)
    this.authService.login(this.user).subscribe(
      data=>{console.log(data['userName']);
      localStorage.setItem("token",data['token']);
      console.log(data['token']);
      console.log(localStorage.getItem('token'));
      // setTimeout(function(){ 
      //   localStorage.removeItem('token');
      // }, 1000); // Will alert once, after a second.
      //localStorage.setItem("cuser",data['userName']);
      this.router.navigate(['/']);},
      error=>console.log(error)
      );
  }

}
