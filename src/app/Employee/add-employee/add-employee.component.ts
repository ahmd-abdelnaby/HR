import { Component, OnInit } from '@angular/core';
import {IProfession} from 'src/app/Data_Types/iprofession'
import { from } from 'rxjs';
import {EmployeeService} from 'src/app/Services/employee.service'
import {Employee} from 'src/app/Data_Types/employee'
import {Gender} from 'src/app/Data_Types/gender'
import {MaritalStatus} from 'src/app/Data_Types/marital-status'
import {Profession} from 'src/app/Data_Types/profession'
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  providers: [DatePipe]
})
export class AddEmployeeComponent implements OnInit {

  profession:any;

 Employee:Employee;
 selectedGender:Gender;
 selectedProfession:Profession;
 selectedMaritalStatus:MaritalStatus;
 genderType: Gender[] = [
  {name:'Male'},
  {name:'Female'}
];
MaritalStatus: MaritalStatus[] = [
{name: 'Single'},
{name: 'Married'}
];
  constructor(private empService:EmployeeService,private router:Router) { 
    this.Employee={Address:'',DateOfBirth:new Date(2018, 0O5, 0O5, 17, 23, 42, 11),Email:'',GraduatioYear:''
    ,HiringDate:new Date(2018, 0O5, 0O5, 17, 23, 42, 11),MaritalStatus:'Marital Status',Name:'',
  Phone:'',ProfessionID:0,RelevantPhone:'',code:'',gender:'Gender'};
 
  this.selectedGender={name:''};
  this.selectedMaritalStatus={ name:''};
  this.selectedProfession={id:0, name:''};

  }

  ngOnInit(): void {
    this.empService.getProfession().subscribe(
      (res)=>{this.profession=res;console.log(this.profession)},
      (err)=>{console.log(err)}
    );

    

  }
  
  add()
  {
    
    console.log(typeof(this.Employee.ProfessionID));
    this.Employee.ProfessionID=Number(this.Employee.ProfessionID);
    this.Employee.GraduatioYear=String(this.Employee.GraduatioYear);
    console.log(typeof(this.Employee.ProfessionID));

    console.log(this.Employee);
    this.empService.AddEmployee(this.Employee).subscribe(
      res=>{this.router.navigate(['/employee']);},
      error=>console.log(error),
    );
  }
  onFileSelected(event)
  {

  }
    


}
