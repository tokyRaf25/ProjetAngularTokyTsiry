import { AuthService } from 'src/app/shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatiersService } from 'src/app/shared/matiers.service';
import { Assignment } from '../assignment.model';
import { Matier } from '../matier.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // Pour les champs du formulaire
  matieres:Matier[];
  dateDeRendu = null;
  nomEleve = '';
  matiere = null;
  note = null;
  remarque = '';

  dateFormGroup: FormGroup;
  nomEleveFormGroup: FormGroup;
  matiereFormGroup: FormGroup;
  noteEtRemarqueFormGroup: FormGroup;

  constructor(private assignmentsService:AssignmentsService,
              private router:Router, private matiersService:MatiersService, private authService:AuthService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.onLoadMatiere();
    this.authService.getSession();
  }


  onLoadMatiere() {
    this.matiersService.getMatieres()
    .subscribe(data => {
      console.log(data);
      this.matieres = data;
    });

  }

  onSubmit(event) {
    if((!this.nomEleve) || (!this.dateDeRendu) || (!this.matiere)){
      this.dialog.open(DialogInvalidFormAdd);
    }else{
      let nouvelAssignment = new Assignment();
      nouvelAssignment.dateDeRendu = this.dateDeRendu;

      nouvelAssignment.idMatiere = this.matiere;
      nouvelAssignment.nomEleve = this.nomEleve;
      nouvelAssignment.remarques = this.remarque;
      nouvelAssignment.note = this.note;

      if(this.note == null){
        nouvelAssignment.rendu = false;
      }else{
        nouvelAssignment.rendu = true;
      }
      this.assignmentsService.addAssignment(nouvelAssignment)
        .subscribe(reponse => {
          console.log(reponse.message);

          // et on navigue vers la page d'accueil qui affiche la liste
          this.router.navigate(["/home"]);
        });
    }


  }

}

@Component({
  selector: 'dialog-invalid-form',
  templateUrl: 'dialog-invalid-form-add.component.html',
})
export class DialogInvalidFormAdd implements OnInit {

  ngOnInit(): void {
  }

  constructor(
    public dialog: MatDialog
  ) {}

}
