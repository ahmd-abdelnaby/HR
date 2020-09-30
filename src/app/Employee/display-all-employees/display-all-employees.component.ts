
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { ConfirmationService } from 'primeng/api';
// import { MessageService } from 'primeng/api';
import {Employee} from 'src/app/Data_Types/Employee';
import {EmployeeService} from 'src/app/Services/employee.service';
import { from } from 'rxjs';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-display-all-employees',
  templateUrl: './display-all-employees.component.html',
  styleUrls: ['./display-all-employees.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class DisplayAllEmployeesComponent implements OnInit {

  productDialog: boolean;

    //Employees: any;

    Employee : any;

    selectedProducts: Employee[];

    submitted: boolean;
  representatives: { name: string; image: string; }[];

    constructor(private EmployeeService: EmployeeService,private router:Router,
        private confirmationService: ConfirmationService,private messageService: MessageService)
     { 
        this.Employee={Address:'',DateOfBirth:new Date(2018, 0O5, 0O5, 17, 23, 42, 11),Email:'',GraduatioYear:''
      ,HiringDate:new Date(2018, 0O5, 0O5, 17, 23, 42, 11),MaritalStatus:'Marital Status',Name:'',
    Phone:'',ProfessionID:0,RelevantPhone:'',code:'',gender:'Gender'};
    }

    Employees: any;
  
    statuses: any[];
    displayBasic: boolean;
    loading: boolean = true;

    @ViewChild('dt') table: Table;

    ngOnInit() {
     
      this.EmployeeService.GetAllEmployees().subscribe(
               (res)=>{this.Employees=res;
                console.log(this.Employees)
                this.loading = false;},
             (err)=>{console.log(err)},
             
              );


    }

    onActivityChange(event) {
        const value = event.target.value;
        if (value && value.trim().length) {
            const activity = parseInt(value);

            if (!isNaN(activity)) {
                this.table.filter(activity, 'activity', 'gte');
            }
        }
    }

    onDateSelect(value) {
        this.table.filter(this.formatDate(value), 'date', 'equals')
    }

    formatDate(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        return date.getFullYear() + '-' + month + '-' + day;
    }

    onRepresentativeChange(event) {
        this.table.filter(event.value, 'representative', 'in')
    }

    edit(id)
    {
        this.router.navigate(['/editEmployee',id]);
        alert(id);
    }
    

    showBasicDialog(id) {
        this.displayBasic = true;
        this.EmployeeService.GetEmployee(id).subscribe(
            data=>{this.Employee=data,console.log(data)},
            error=>{console.log(error)}
        )
    }

    confirm(id) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
                this.EmployeeService.delete(id).subscribe(
                  data=>{
                    this.ngOnInit(),
                    this.messageService.add({severity:'info', summary:'Record Deleted!', detail:'Record Deleted!'});
                  }
                )
            }
        });
      }
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
