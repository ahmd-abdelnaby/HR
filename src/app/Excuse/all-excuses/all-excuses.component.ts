import { Component, HostListener, OnInit } from '@angular/core';
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

  
  excuses:any;
  constructor(private ExcuseService:ExcuseService) { }

  ngOnInit(): void {
    this.ExcuseService.AllExcuses().subscribe(
      data=>{this.excuses=data;console.log(data)},
      error=>console.log(error)
    );
  }

}
