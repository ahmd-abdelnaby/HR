import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { Child1Component } from './main/child1/child1.component';
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';
import { AddProfessionComponent } from './Profession/add-profession/add-profession.component';
import { DisplayAllEmployeesComponent } from './Employee/display-all-employees/display-all-employees.component';
import { EditEmployeeComponent } from './Employee/edit-employee/edit-employee.component';
import { AddExcuseComponent } from './Excuse/add-excuse/add-excuse.component';

const routes: Routes = [
  {path:'Register' , component:RegisterComponent  },
  {path:'login',component:LoginComponent},
  {path:'',component:SideNavComponent,children: [
    { path: 'employee', component:DisplayAllEmployeesComponent },
    { path: 'addemployee', component:AddEmployeeComponent },
    { path: 'profession', component:AddProfessionComponent },
    { path: 'editEmployee/:empId', component:EditEmployeeComponent },
    { path: 'AddExcuse', component:AddExcuseComponent },
   ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
