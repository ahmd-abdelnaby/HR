import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';
import { IUser } from 'src/app/Data_Types/iuser'
import { Excuse } from '../Data_Types/excuse';

@Injectable({
  providedIn: 'root'
})
export class ExcuseService {

  constructor(private httpclient: HttpClient) { }

  addExcuse(excuse: Excuse) :Observable<any> {
    console.log(excuse)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };

    return this.httpclient.post("http://localhost:50652/api/Excuses", excuse, httpOptions);
  }

  AllExcuses():Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.get("http://localhost:50652/api/Excuses",httpOptions)
  }
}
