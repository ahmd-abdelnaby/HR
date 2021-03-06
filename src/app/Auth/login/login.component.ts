import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/Services/auth.service'
import { IUser } from 'src/app/Data_Types/iuser';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:IUser;
  roles:any;
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
      localStorage.setItem("roles",data['roles']);
      console.log(data['token']);

      
      console.log(localStorage.getItem('roles'));
      this.router.navigate(['/']);},
      error=>console.log(error)
      );
  }

}
