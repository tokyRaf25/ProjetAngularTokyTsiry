import { Component, OnInit, Inject, Injectable  } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-assignment-login',
  templateUrl: './assignment-login.component.html',
  styleUrls: ['./assignment-login.component.css']
})
export class AssignmentLoginComponent implements OnInit {

  hide = true;

  // Pour les champs du formulaire
  utilisateur = '';
  motdepasse = '';
  invalidLogin = false;

  constructor(private authService:AuthService, private router:Router,
    private assignmentsService:AssignmentsService, @Inject(LOCAL_STORAGE) private storage: StorageService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.authService.getSession();
  }

  onSubmit(event) {

    if((!this.utilisateur) || (!this.motdepasse)){
      this.dialog.open(DialogInvalidLogin);
    }else{
      this.login(this.utilisateur,this.motdepasse);
    }


  }

  login(username, password) {
    this.authService.logIn(username, password)
      .subscribe(reponse => {
        if(reponse===null){
          this.invalidLogin = true;
        }
        if(reponse!=null){
          if(reponse.statue="admin"){
            this.authService.createSessionAdmin();
          }
          this.router.navigate(["/home"]);
        }
      });


  }

}
@Component({
  selector: 'dialog-invalid-form',
  templateUrl: 'dialog-invalid-login.component.html',
})
export class DialogInvalidLogin implements OnInit {

  ngOnInit(): void {
  }

  constructor(
    public dialog: MatDialog
  ) {}

}
