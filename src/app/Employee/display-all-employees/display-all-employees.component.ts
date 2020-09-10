
import { Component, OnInit, ViewChild } from '@angular/core';
// import { ConfirmationService } from 'primeng/api';
// import { MessageService } from 'primeng/api';
import {Employee} from 'src/app/Data_Types/Employee';
import {EmployeeService} from 'src/app/Services/employee.service';
import { from } from 'rxjs';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-display-all-employees',
  templateUrl: './display-all-employees.component.html',
  styleUrls: ['./display-all-employees.component.css']
})
export class DisplayAllEmployeesComponent implements OnInit {

  productDialog: boolean;

    //Employees: any;

    Employee : Employee;

    selectedProducts: Employee[];

    submitted: boolean;
  representatives: { name: string; image: string; }[];

    constructor(private EmployeeService: EmployeeService,private router:Router) { }

    // ngOnInit() {
    //     this.EmployeeService.GetAllEmployees().subscribe(
    //       (res)=>{this.Employees=res;},
    //      (err)=>{console.log(err)}
    //      );

    // }
    Employees: any;

   // representatives: Representative[];

    statuses: any[];

    loading: boolean = true;

    @ViewChild('dt') table: Table;

    ngOnInit() {
     
      this.EmployeeService.GetAllEmployees().subscribe(
               (res)=>{this.Employees=res;
                console.log(this.Employees)
                this.loading = false;},
             (err)=>{console.log(err)},
             
              );

        this.representatives = [
            {name: "Amy Elsner", image: 'amyelsner.png'},
            {name: "Anna Fali", image: 'annafali.png'},
            {name: "Asiya Javayant", image: 'asiyajavayant.png'},
            {name: "Bernardo Dominic", image: 'bernardodominic.png'},
            {name: "Elwin Sharvill", image: 'elwinsharvill.png'},
            {name: "Ioni Bowcher", image: 'ionibowcher.png'},
            {name: "Ivan Magalhaes",image: 'ivanmagalhaes.png'},
            {name: "Onyama Limba", image: 'onyamalimba.png'},
            {name: "Stephen Shaw", image: 'stephenshaw.png'},
            {name: "XuXue Feng", image: 'xuxuefeng.png'}
        ];

        this.statuses = [
            {label: 'Unqualified', value: 'unqualified'},
            {label: 'Qualified', value: 'qualified'},
            {label: 'New', value: 'new'},
            {label: 'Negotiation', value: 'negotiation'},
            {label: 'Renewal', value: 'renewal'},
            {label: 'Proposal', value: 'proposal'}
        ]
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

}
