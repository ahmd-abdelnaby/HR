import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  

  constructor(private AuthService:AuthService) { }
  userName=localStorage.getItem("cuser")
  ngOnInit(): void {
    
  }

  logout()
  {
    this.AuthService.logout();
  }
}
