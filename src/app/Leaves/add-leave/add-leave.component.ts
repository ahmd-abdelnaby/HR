import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/Services/employee.service';
import { LeaveService } from 'src/app/Services/leave.service';
import { UploadFilesService } from 'src/app/Services/upload-files.service';
import { LeaveRequest } from 'src/app/Data_Types/leave-request';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.css']
})
export class AddLeaveComponent implements OnInit {

  LeaveRequest: LeaveRequest;
  OldAddress = false;
  EndDate: Date;
  EmployeeByProfession: any;
  LeaveTypes: any;
  img:string
  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  fileInfos: Observable<any>;

  constructor(private EmpService: EmployeeService, private Leaveservice: LeaveService,
    private uploadService: UploadFilesService) {
    this.LeaveRequest = {
      Comment: '', AlternativeAddress: '', Status: 'pending', LeavesFiles: '',
      AlternativeEmpID: 0, Days: 0, EmployeeID: 0, LeaveTypeID: 0, start: new Date(Date.now())
    }
  }

  // @ViewChild('someInput') someInput: ElementRef;

  ngOnInit(): void {
    this.EmpService.EmployeeByProfession().subscribe(
      data => { console.log(data), this.EmployeeByProfession = data },
      error => console.log(error)
    );
    this.Leaveservice.GetLeaveTypes().subscribe(
      data => { console.log(data), this.LeaveTypes = data },
      error => console.log(error)
    );

    this.fileInfos = this.uploadService.getFiles();
  }

  add() {
    console.log(this.LeaveRequest);
    this.LeaveRequest.AlternativeEmpID = Number(this.LeaveRequest.AlternativeEmpID);
    this.LeaveRequest.LeaveTypeID = Number(this.LeaveRequest.LeaveTypeID);
    console.log(typeof (this.LeaveRequest.AlternativeEmpID))
    console.log(this.LeaveRequest.AlternativeEmpID);
    var data={
      EmployeeID:this.LeaveRequest.EmployeeID,
      LeaveTypeID:this.LeaveRequest.LeaveTypeID,
      Start:this.LeaveRequest.start,
      Days:this.LeaveRequest.Days,
      AlternativeEmpID:this.LeaveRequest.AlternativeEmpID,
      Comment:this.LeaveRequest.Comment,
      AlternativeAddress:this.LeaveRequest.AlternativeAddress,
      Status:this.LeaveRequest.Status,
      LeavesFiles:{Name:this.LeaveRequest.LeavesFiles}
    }
    this.Leaveservice.addLeave(this.LeaveRequest).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }
  jj() {
    alert('dd');
  }
  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    // console.log(this.LeaveRequest.Files);
    // console.log(this.selectedFiles);
    this.uploadFiles()
  }

  uploadFiles() {
    this.message = '';

    for (let i = 0; i < this.selectedFiles.length; i++) {
      const oldName = this.selectedFiles[i].name;
      console.log(oldName)
     this.img=oldName
     console.log(this.img)
      const fileExtension = oldName.slice(oldName.lastIndexOf('.') - oldName.length);
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      const lengthOfCode = 40;
      const newName = this.makeRandom(lengthOfCode, possible);
      this.LeaveRequest.LeavesFiles=this.LeaveRequest.LeavesFiles.concat(','+ newName + fileExtension);
      Object.defineProperty(this.selectedFiles[i], 'name', {
        writable: true,
        value: newName + fileExtension
      });
      console.log(this.selectedFiles[i].name)
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(idx, file) {
    console.log(file.name)

    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.uploadService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }

  makeRandom(lengthOfCode, possible) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text;
  }

}
