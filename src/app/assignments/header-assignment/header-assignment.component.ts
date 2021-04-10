import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-header-assignment',
  templateUrl: './header-assignment.component.html',
  styleUrls: ['./header-assignment.component.css']
})
export class HeaderAssignmentComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router,private assignmentsService:AssignmentsService) { }

  ngOnInit(): void {
  }

  OnLogout(){
    //console.log("je me déconnecte!!");
    this.authService.logOut();
    this.router.navigate(["/"]);
  }
}
