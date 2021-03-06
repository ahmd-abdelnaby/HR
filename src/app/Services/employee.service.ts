import {observable} from '../../../node_modules/rxjs/src/internal/symbol/observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Data_Types/employee';
import { map, filter, switchMap } from 'rxjs/operators';


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
      "Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpclient.get<Employee>("http://localhost:50652/api/Employees/"+id,httpOptions);
  }
  UpdateEmployee(id,emp)
  {
    //console.log(emp);
    const httpHeader={headers: new HttpHeaders({
      'content-type':'application/json',
      'Accept': '*/*'
         
    })};
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpclient.put("http://localhost:50652/api/Employees/"+id,emp,httpHeader);
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'http://localhost:50652/api/Employees/api/dashboard/UploadImage';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpclient
      .post(endpoint, formData).pipe(
      map(() => { return true; }));
  }

  EmployeeByProfession()
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpclient.get("http://localhost:50652/api/Employees/EmployeeByProfession",httpOptions);
  }
  GetAllEmployeesByProfession(id)
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpclient.get("http://localhost:50652/api/Employees/GetAllEmployeesByProfession/"+id,this.httpHeader);
  }
  delete(id)
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpclient.delete("http://localhost:50652/api/Employees/"+id,this.httpHeader);
  }
}




