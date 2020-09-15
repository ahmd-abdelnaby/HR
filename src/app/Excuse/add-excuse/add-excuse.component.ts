import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {Excuse} from 'src/app/Data_Types/excuse';
import {MenuItem} from 'primeng/api';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import {ExcuseService} from 'src/app/Services/excuse.service'

@Component({
  selector: 'app-add-excuse',
  templateUrl: './add-excuse.component.html',
  styleUrls: ['./add-excuse.component.css']
})
export class AddExcuseComponent implements OnInit {

  Excuse:Excuse
  constructor(private ExcuseService:ExcuseService) {
     this.Excuse={Approved:false,Date:new Date(Date.now()),Comment:'',Hours:0,Time:{hours:0,minutes:0}};
}

  ngOnInit(): void {
  }
  add()
  {
    console.log((this.Excuse));
    this.ExcuseService.addExcuse(this.Excuse).subscribe(
      res=>{console.log(res)},
      error=>console.log(error),
    );
    
  }

}
