import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AccordionModule} from 'primeng/accordion'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { Child1Component } from './main/child1/child1.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from  '@angular/common/http';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TabViewModule} from 'primeng/tabview';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ProgressBarModule} from 'primeng/progressbar';
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';
import {AuthGuard} from 'src/app/Guards/auth.guard'
import { AddProfessionComponent } from './Profession/add-profession/add-profession.component';
import { DisplayAllEmployeesComponent } from './Employee/display-all-employees/display-all-employees.component';
import { from } from 'rxjs';
import { EditEmployeeComponent } from './Employee/edit-employee/edit-employee.component';
import { AllExcusesComponent } from './Excuse/all-excuses/all-excuses.component';
import { AddExcuseComponent } from './Excuse/add-excuse/add-excuse.component';
import { PreviosExcuseComponent } from './Excuse/previos-excuse/previos-excuse.component';
import { ErrorInterceptor } from '../app/Data_Types/error.interceptor';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { AddLeaveComponent } from './Leaves/add-leave/add-leave.component';
import { AllLeavesComponent } from './Leaves/all-leaves/all-leaves.component';
import { PreviousLeavesComponent } from './Leaves/previous-leaves/previous-leaves.component';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SideNavComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    Child1Component,
    AddEmployeeComponent, 
    AddProfessionComponent, 
    DisplayAllEmployeesComponent, 
    EditEmployeeComponent, 
    AllExcusesComponent,  
    AddExcuseComponent, 
    PreviosExcuseComponent,  
    AddLeaveComponent,  
    AllLeavesComponent,  
    PreviousLeavesComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AccordionModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    TabViewModule,
    CalendarModule,
    DropdownModule,
    InputMaskModule,
    TableModule,
    ToastModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    ToastModule,
    MatSliderModule,
    MatIconModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService,MessageService,AuthGuard,{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
