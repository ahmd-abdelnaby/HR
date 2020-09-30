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

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      "Authorization": "bearer " + localStorage.getItem('token')
    })
  };
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
    return this.httpclient.get("http://localhost:50652/api/Excuses",this.httpOptions)
  }

  getexcuseByID(id):Observable<any>
  {
    return this.httpclient.get("http://localhost:50652/api/Excuses/"+id,this.httpOptions)
  }
  Update(Excuse,id):Observable<any>
  {
    return this.httpclient.put("http://localhost:50652/api/Excuses/"+id,Excuse,this.httpOptions)
  }
  ApprovedExcuses():Observable<any>
  {
    return this.httpclient.get("http://localhost:50652/api/Excuses/ApprovedExcuses",this.httpOptions)
  }
  DisApprovedExcuses():Observable<any>
  {
    return this.httpclient.get("http://localhost:50652/api/Excuses/DisApprovedExcuses",this.httpOptions)
  }
  PendingExcuses():Observable<any>
  {
    return this.httpclient.get("http://localhost:50652/api/Excuses/PendingExcuses",this.httpOptions)
  }
  approve(id):Observable<any>
  {
    return this.httpclient.get("http://localhost:50652/api/Excuses/AcceptExcuse/"+id,this.httpOptions)
  }
  disapprove(id):Observable<any>
  {
    return this.httpclient.get("http://localhost:50652/api/Excuses/RejectExcuse/"+id,this.httpOptions)
  }
  PreviousExcuses():Observable<any>
  {
    return this.httpclient.get("http://localhost:50652/api/Excuses/PreviousExcuses",this.httpOptions)
  }
  delete(id):Observable<any>
  {
    return this.httpclient.delete("http://localhost:50652/api/Excuses/"+id,this.httpOptions)
  }
}
