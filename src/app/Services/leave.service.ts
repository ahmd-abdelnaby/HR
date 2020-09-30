import {observable} from '../../../node_modules/rxjs/src/internal/symbol/observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Data_Types/employee';
import { map, filter, switchMap } from 'rxjs/operators';
import { LeaveRequest } from '../Data_Types/leave-request';


@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private httpclient: HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'
       
  })};

  AllLeaves()
  {
    return this.httpclient.get("http://localhost:50652/api/LeaveRequests",this.httpHeader);

  }
  getLeaveByID(id)
  {
    return this.httpclient.get("http://localhost:50652/api/LeaveRequests/"+id,this.httpHeader);
  }
  getrequestLeaveByID(id)
  {
    return this.httpclient.get("http://localhost:50652/api/LeaveRequests/getLeaveRequestfiles/"+id,this.httpHeader);
  }
  addLeave(LeaverReuest:LeaveRequest)
  {
    return this.httpclient.post("http://localhost:50652/api/LeaveRequests",LeaverReuest,this.httpHeader);
  }
  GetLeaveTypes()
  {
    return this.httpclient.get("http://localhost:50652/api/LeaveRequests/GetLeaveTypes",this.httpHeader);
  }
  ApprovedLeaves():Observable<any>
  {
    return this.httpclient.get("http://localhost:50652/api/LeaveRequests/ApprovedLeaves",this.httpHeader)
  }
  DisApprovedLeaves():Observable<any>
  {
    return this.httpclient.get("http://localhost:50652/api/LeaveRequests/DisApprovedLeaves",this.httpHeader)
  }
  PendingLeaves():Observable<any>
  {
    return this.httpclient.get("http://localhost:50652/api/LeaveRequests/PendingLeaves",this.httpHeader)
  }
  approve(id):Observable<any>
  {
    return this.httpclient.get("http://localhost:50652/api/LeaveRequests/AcceptLeave/"+id,this.httpHeader)
  }
  disapprove(id):Observable<any>
  {
    return this.httpclient.get("http://localhost:50652/api/LeaveRequests/RejectLeave/"+id,this.httpHeader)
  }
  PreviousExcuses():Observable<any>
  {
    return this.httpclient.get("http://localhost:50652/api/LeaveRequests/PreviousLeaves",this.httpHeader)
  }
  delete(id)
  {
    return this.httpclient.delete("http://localhost:50652/api/LeaveRequests/"+id,this.httpHeader)
  }
}
