import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ExcuseService} from 'src/app/Services/excuse.service'



@Component({
  selector: 'app-all-excuses',
  templateUrl: './all-excuses.component.html',
  styleUrls: ['./all-excuses.component.css']
})

export class AllExcusesComponent implements OnInit {
  @HostListener('window:beforeunload')
  doSomething() { alert('dfjkf');
  }

  
  Allexcuses:any;
  Approvedexcuses:any;
  DisApprovedexcuses:any;
  PendingExcuse:any;
  constructor(private ExcuseService:ExcuseService,private router:Router) { }

  ngOnInit(): void {
    this.ExcuseService.AllExcuses().subscribe(
      data=>{this.Allexcuses=data;console.log(data)},
      error=>console.log(error)
    );

    this.ExcuseService.ApprovedExcuses().subscribe(
      data=>{this.Approvedexcuses=data;console.log(data)},
      error=>console.log(error)
    );

    this.ExcuseService.DisApprovedExcuses().subscribe(
      data=>{this.DisApprovedexcuses=data;console.log(data)},
      error=>console.log(error)
    );

    this.ExcuseService.PendingExcuses().subscribe(
      data=>{this.PendingExcuse=data;console.log(data)},
      error=>console.log(error)
    );

  }
  approve(exID)
  {
    this.ExcuseService.approve(exID).subscribe(
      res=>{console.log(res),this.ngOnInit()},
      error=>console.log(error),
    );
    
  }
  disapprove(exID)
  {
    this.ExcuseService.disapprove(exID).subscribe(
      res=>{this.ngOnInit()},
      error=>console.log(error),
    );
  }
}
