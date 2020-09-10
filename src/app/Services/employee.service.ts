import {observable} from '../../../node_modules/rxjs/src/internal/symbol/observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Data_Types/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpclient: HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'
       
  })};
  

  getProfession()
  {
    const httpHeader={headers: new HttpHeaders({
      'content-type':'application/json',
      'Accept': '*/*'
         
    })};
    return this.httpclient.get("http://localhost:50652/api/Professions",httpHeader)
  }
  AddEmployee(emp:Employee)
  {
    //console.log(emp);
    const httpHeader={headers: new HttpHeaders({
      'content-type':'application/json',
      'Accept': '*/*'
         
    })};
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //"Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpclient.post("http://localhost:50652/api/Employees",emp,httpOptions);
  }
  GetAllEmployees()
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //"Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpclient.get("http://localhost:50652/api/Employees",httpOptions);
  }
  GetEmployee (id): Observable<Employee>
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //"Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpclient.get<Employee>("http://localhost:50652/api/Employees/"+id,httpOptions);
  }
  UpdateEmployee(id,emp:Employee)
  {
    //console.log(emp);
    const httpHeader={headers: new HttpHeaders({
      'content-type':'application/json',
      'Accept': '*/*'
         
    })};
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //"Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpclient.put("http://localhost:50652/api/Employees/"+id,emp,httpHeader);
  }
}




