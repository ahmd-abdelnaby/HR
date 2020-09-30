import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Excuse } from 'src/app/Data_Types/excuse';
import { EmployeeService } from 'src/app/Services/employee.service';
import {ExcuseService} from 'src/app/Services/excuse.service'



@Component({
  selector: 'app-all-excuses',
  templateUrl: './all-excuses.component.html',
  styleUrls: ['./all-excuses.component.css']
})

export class AllExcusesComponent implements OnInit {
  displayBasic: boolean;
  EditLeave: boolean;
  NewExcuseDialogbool: boolean;
  NewExcuse:any;
  Allexcuses:any;
  Approvedexcuses:any;
  DisApprovedexcuses:any;
  PendingExcuse:any;
  Excuse:any;
  EditExcuse:Excuse;
  EditExcuseboolean: boolean;
  ProfessionID: number;
  AllEmployeesByProfession: any;
  AllProfessions: any;
  @HostListener('window:beforeunload')
  doSomething() { alert('dfjkf');
  }

  
  
  constructor(private ExcuseService:ExcuseService,private router:Router
    ,private EmpService: EmployeeService,private confirmationService: ConfirmationService,
    private messageService: MessageService) { 
      
    this.NewExcuse={approved:"pending",employeeName:'',id:0,profession:'',date:new Date(Date.now()),comment:'',hours:0,time:{hours:0,minutes:0}};
    this.Excuse={Approved:"pending",Date:new Date(Date.now()),Comment:'',Hours:0,Time:{hours:0,minutes:0}};
    this.ExcuseService.PendingExcuses().subscribe(
      data=>{this.PendingExcuse=data;console.log(data)},
      error=>console.log(error)
    );
  }

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
  showBasicDialog(id) {
    this.displayBasic = true;
    this.ExcuseService.getexcuseByID(id).subscribe(
      data => { this.Excuse = data, console.log(data) },
      error => { console.log(error) }
    );
  }
  EditExcuseDialog(id) {
    this.EditExcuseboolean = true;
    this.ExcuseService.getexcuseByID(id).subscribe(
      data => { this.NewExcuse = data, console.log(this.NewExcuse) },
      error => { console.log(error) }
    )
  }
  update(id) {

    var data={ID:this.NewExcuse.id,Approved:this.NewExcuse.approved,Comment:this.NewExcuse.comment,Date:this.NewExcuse.date,
    Hours:this.NewExcuse.hours,Time:this.NewExcuse.time};
    this.ExcuseService.Update(data,id).subscribe(
      data => { console.log(data),this.ngOnInit() },
      error => { console.log(error) }
    );
    this.EditExcuseboolean = false;
  }
  NewLeaveDialog() {
    this.NewExcuseDialogbool = true;
    this.EmpService.getProfession().subscribe(
      data => this.AllProfessions = data,
      error => console.log(error)
    );
  }
  onChange(deviceValue) {
    this.EmpService.GetAllEmployeesByProfession(deviceValue).subscribe(
      data => { this.AllEmployeesByProfession = data },
      error => console.log(error)
    )
  }
  add()
  {
    console.log((this.NewExcuse));
    var data={ID:this.NewExcuse.id,Approved:this.NewExcuse.approved,Comment:this.NewExcuse.comment,Date:this.NewExcuse.date,
      Hours:this.NewExcuse.hours,Time:this.NewExcuse.time,EmployeeID:Number(this.NewExcuse.EmployeeID)};
    this.ExcuseService.addExcuse(data).subscribe(
      res=>
      {
        console.log(res);
        this.NewExcuseDialogbool = false;
        this.ngOnInit()
      },
      error=>console.log(error),
    );
  }
  confirm(id) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            this.ExcuseService.delete(id).subscribe(
              data=>
              {
                this.ngOnInit(),
                this.messageService.add({severity:'info', summary:'Record Deleted!', detail:'Record Deleted!'});
              }
            )
        }
    });
  }

  //Toast
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
}

showInfo() {
    this.messageService.add({severity:'info', summary: 'Info', detail: 'Message Content'});
}

showWarn() {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Message Content'});
}

showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
}

showTopLeft() {
    this.messageService.add({key: 'tl', severity:'info', summary: 'Info', detail: 'Message Content'});
}

showTopCenter() {
    this.messageService.add({key: 'tc', severity:'info', summary: 'Info', detail: 'Message Content'});
}

showBottomCenter() {
    this.messageService.add({key: 'bc', severity:'info', summary: 'Info', detail: 'Message Content'});
}

showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
}

showMultiple() {
    this.messageService.addAll([
        {severity:'info', summary:'Message 1', detail:'Message Content'},
        {severity:'info', summary:'Message 2', detail:'Message Content'},
        {severity:'info', summary:'Message 3', detail:'Message Content'}
    ]);
}

showSticky() {
    this.messageService.add({severity:'info', summary: 'Sticky', detail: 'Message Content', sticky: true});
}

onConfirm() {
    this.messageService.clear('c');
}

onReject() {
    this.messageService.clear('c');
}

clear() {
    this.messageService.clear();
}

}
