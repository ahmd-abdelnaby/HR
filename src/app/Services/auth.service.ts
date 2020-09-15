import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';
import { IUser } from 'src/app/Data_Types/iuser'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: IUser;
  constructor(private httpclient: HttpClient) {
    
  }

  login(user:IUser) {
    console.log(user)
    var data = "email=" +user.email + "&password=" + user.password + "&grant_type=password";
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    });
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
      //"Authorization": "bearer " + localStorage.getItem('token')
        })};

    return this.httpclient.post("http://localhost:50652/api/Authenticate/login", user, httpOptions)
    ;
  }
  loggedIn()
  {
    return !! localStorage.getItem('token');
  }
}
