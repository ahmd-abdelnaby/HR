import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Data_Types/employee';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

 Employee:any;
 profession:any;


  EmployeeID = this.activeRoute.snapshot.params['empId'];

  constructor(private empService:EmployeeService,private router:Router
    ,private activeRoute: ActivatedRoute) {
      this.Employee={Address:'',DateOfBirth:new Date(2018, 0O5, 0O5, 17, 23, 42, 11),Email:'',GraduatioYear:''
      ,HiringDate:new Date(2018, 0O5, 0O5, 17, 23, 42, 11),MaritalStatus:'Marital Status',Name:'',
    Phone:'',ProfessionID:0,RelevantPhone:'',code:'',gender:'Gender'};
    }

  ngOnInit(): void {
    console.log(this.EmployeeID);
    this.empService.getProfession().subscribe(
      (res)=>{this.profession=res;console.log(this.profession)},
      (err)=>{console.log(err)}
    );
    this.empService.GetEmployee(this.EmployeeID).subscribe(
      (res)=>{
        this.Employee=res;
        console.log(this.Employee);
      },
      (err)=>{console.log(err)}
    );
  }

  update()
  {
    this.empService.UpdateEmployee(this.EmployeeID,this.Employee).subscribe(
      res=>{this.router.navigate(['/employee']);},
      error=>console.log(error),
    );
  }

}
