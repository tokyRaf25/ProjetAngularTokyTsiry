import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { MatiersService } from 'src/app/shared/matiers.service';
import { Assignment } from '../assignment.model';
import { Matier } from '../matier.model';
import {MatDialog} from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  // passé sous forme d'attribut HTML
  assignmentTransmis: Assignment;
  matiereTransmis: Matier;
  note: null;
  check: false;
  remarque: null;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private matiersService: MatiersService,
    private authService:AuthService,
    public dialog: MatDialog,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit(): void {
    this.getAssignmentById();
    this.authService.getSession();
  }

  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.matiersService.getMatiere(assignment.idMatiere).subscribe((matiere) => {
        this.matiereTransmis = matiere;
      });
      this.assignmentTransmis = assignment;
    });
  }

  onAssignmentRendu() {
    if((!this.note)){
      let dialogue = this.dialog.open(DialogInvalidForm);
      dialogue.afterClosed().subscribe(result => {
        this._document.defaultView.location.reload();
      });
    }else{
      this.assignmentTransmis.rendu = true;
      this.assignmentTransmis.note = this.note;
      this.assignmentTransmis.remarques = this.remarque;
      this.assignmentsService
      .updateAssignment(this.assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message);
        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/home']);
      });
    }

    //this.assignmentTransmis = null;
  }

  onDelete() {
    this.assignmentsService
      .deleteAssignment(this.assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // on cache l'affichage du détail
        this.assignmentTransmis = null;

        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/home']);
      });
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'], {
      /*queryParams: {
        nom:'Michel Buffa',
        metier:"Professeur",
        responsable:"MIAGE"
      },
      fragment:"edition"*/
    });
  }

  isAdmin() {
    return this.authService.admin;
  }

}

@Component({
  selector: 'dialog-invalid-form',
  templateUrl: 'dialog-invalid-form.component.html',
})
export class DialogInvalidForm implements OnInit {

  ngOnInit(): void {
  }

  constructor(
    public dialog: MatDialog
  ) {}

}
