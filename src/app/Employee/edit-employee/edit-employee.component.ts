import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Data_Types/employee';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
  providers: [DatePipe]

})
export class EditEmployeeComponent implements OnInit {

  Employee: any;
  profession: any;
  selectedFile: any;
  fileToUpload: File;
  uploadedFiles: any[] = [];

  EmployeeID = this.activeRoute.snapshot.params['empId'];

  constructor(private empService: EmployeeService, private router: Router
    , private activeRoute: ActivatedRoute,public datepipe: DatePipe,
    private confirmationService: ConfirmationService,private messageService: MessageService) {
    this.Employee = {
      Address: '', DateOfBirth: new Date(2018, 0O5, 0O5, 17, 23, 42, 11), Email: '', GraduatioYear: ''
      , HiringDate: new Date(2018, 0O5, 0O5, 17, 23, 42, 11), MaritalStatus: 'Marital Status', Name: '',
      Phone: '', ProfessionID: 0, RelevantPhone: '', code: '', gender: 'Gender'
    };
  }

  ngOnInit(): void {
    console.log(this.EmployeeID);
    this.empService.getProfession().subscribe(
      (res) => { this.profession = res; console.log(this.profession) },
      (err) => { console.log(err) }
    );
    this.empService.GetEmployee(this.EmployeeID).subscribe(
      (res) => {
        this.Employee = res;
        console.log(this.Employee);
      },
      (err) => { console.log(err) }
    );
  }

  update() {
    console.log(this.Employee);
    var data = {
      Address: this.Employee.address,
      DateOfBirth: this.Employee.dateOfBirth,
      Email: this.Employee.email,
      GraduatioYear: this.Employee.graduatioYear
      , hiringDateHiringDate: this.Employee.hiringDateHiringDate,
      MaritalStatus: this.Employee.maritalStatus,
      id: this.Employee.id,
      Name: this.Employee.name,
      Phone: this.Employee.phone,
      Photo: this.Employee.photo,
      ProfessionID: Number(this.Employee.professionID),
      RelevantPhone: this.Employee.relevantPhone,
      code: this.Employee.code,
      gender: this.Employee.gender
    };

    data.GraduatioYear=String(data.GraduatioYear)
    console.log(this.Employee.professionID)
    console.log(typeof (this.Employee.professionID))
    console.log(data)
    this.empService.UpdateEmployee(this.EmployeeID, data).subscribe(
      
      res => { 
      this.messageService.add({severity:'info', summary:'Record Updated!', detail:'Record Updated!'});
        this.router.navigate(['/employee']);
     },
      error => console.log(error),
    );
  }

  onFileSelected(files: FileList) {

    this.fileToUpload = files.item(0);
    const oldName = this.fileToUpload.name;
    const fileExtension = oldName.slice(oldName.lastIndexOf('.') - oldName.length);
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const lengthOfCode = 40;
    const newName = this.makeRandom(lengthOfCode, possible);

    console.log(this.fileToUpload.name);
    Object.defineProperty(this.fileToUpload, 'name', {
      writable: true,
      value: newName + fileExtension
    });
    console.log(this.fileToUpload.name);

    this.Employee.photo = this.fileToUpload.name;
    //alert(this.prd.Img);

    this.uploadFileToActivity();
  }
  uploadFileToActivity() {
    this.empService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      //c(data);
    }, error => {
      console.log(error);
    });
  }
  makeRandom(lengthOfCode, possible) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text;
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
