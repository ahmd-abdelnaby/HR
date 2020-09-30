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
import {AuthGuard} from 'src/app/Guards/auth.guard'
import {AdminGuard} from 'src/app/Guards/admin.guard'
import { from } from 'rxjs';
import { PreviosExcuseComponent } from './Excuse/previos-excuse/previos-excuse.component';
import { AllExcusesComponent } from './Excuse/all-excuses/all-excuses.component';
import { AddLeaveComponent } from './Leaves/add-leave/add-leave.component';
import { PreviousLeavesComponent } from './Leaves/previous-leaves/previous-leaves.component';
import { AllLeavesComponent } from './Leaves/all-leaves/all-leaves.component';

const routes: Routes = [
  {path:'Register' , component:RegisterComponent  },
  {path:'login',component:LoginComponent},
  {path:'',component:SideNavComponent,canActivate:[AuthGuard] ,children: [
    { path: 'employee', component:DisplayAllEmployeesComponent,canActivate:[AdminGuard] },
    { path: 'addemployee', component:AddEmployeeComponent },
    { path: 'profession', component:AddProfessionComponent },
    { path: 'editEmployee/:empId', component:EditEmployeeComponent },
    { path: 'AddExcuse', component:AddExcuseComponent,canActivate:[AuthGuard] },
    { path: 'previousExcuse', component:PreviosExcuseComponent,canActivate:[AuthGuard] },
    { path: 'AllExcuses', component:AllExcusesComponent,canActivate:[AuthGuard] },
    { path: 'AddLeave', component:AddLeaveComponent,canActivate:[AuthGuard] },
    { path: 'previousLeave', component:PreviousLeavesComponent,canActivate:[AuthGuard] },
    { path: 'AllLeaves', component:AllLeavesComponent,canActivate:[AuthGuard,AdminGuard] },
   ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
