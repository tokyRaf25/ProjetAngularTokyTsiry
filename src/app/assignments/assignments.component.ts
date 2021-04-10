import { Matier } from './matier.model';
import { MatiersService } from 'src/app/shared/matiers.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Assignment } from './assignment.model';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as data from '../shared/dataAssign.json';
import { AssignmentVue } from './assignmentVue.model';


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})

export class AssignmentsComponent implements OnInit {
  assignmentsRendu: AssignmentVue[] = [];
  assignmentsNonRendu: AssignmentVue[] = [];
  page: number=1;
  limit: number=10;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;
  dismissMessage: string = "Fermer";
  msgDragAndDrop: string = "Vous pouvez faire un drag and drop d'un devoir non rendu à un devoir rendu"
  assignmentsData:Assignment[] = (data  as  any).default;

  // on injecte le service de gestion des assignments
  constructor(private authService:AuthService, private router:Router,
    private assignmentsService:AssignmentsService,
    private matiereService: MatiersService,
    private _snackBar: MatSnackBar) {}

  ngOnInit() {
    console.log('AVANT AFFICHAGE');

    this.authService.getSession();

    // on utilise le service pour récupérer les
    // assignments à afficher
    if(!this.authService.loggedIn){
      this.router.navigate(["/"]);
    }
    this.onLoadData(this.page,this.limit);

      /*
      this.assignmentsService.getAssignmentsAsPromise().then(assignments => {
        this.assignments = assignments;
        console.log("données reçues avec Promise");

      });
    */
      this._snackBar.open(this.msgDragAndDrop, this.dismissMessage, {
        duration: 5000,
      });

      //this.onLoadDataAssignmentVue(this.page,this.limit);
      console.log("getAssignments() du service appelé");
  }

  /*onLoadDataAssignmentVue(page:number,limit:number){
    this.assignmentsService.getAssignmentsVue(page, limit)
    .subscribe(data => {
      console.log(data);
    });
  }*/

  onLoadData(page:number,limit:number){
    this.assignmentsService.getAssignmentsVue(page, limit)
    .subscribe(data => {
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;

      this.assignmentsRendu = [];
      this.assignmentsNonRendu = [];

      this.assignmentsRendu = data.docs;
      this.assignmentsNonRendu = data.docs_non_rendue;
    });
  }

  onDeleteAssignment(event) {
    // event = l'assignment à supprimer

    //this.assignments.splice(index, 1);
    this.assignmentsService.deleteAssignment(event)
      .subscribe(message => {
        console.log(message);
      })
  }

  OnNextPage(){
    this.onLoadData(this.page+1,this.limit);
  }

  OnPreviousPage(){
    this.onLoadData(this.page-1,this.limit);
  }

  OnOptionSelected(value:string){
    this.limit = Number(value);
    this.page = 1;
    this.onLoadData(this.page,this.limit);
  }

  drop(event: CdkDragDrop<AssignmentVue[]>) {
    let assignmentDrag = event.previousContainer.data[event.previousIndex]
    this.router.navigate(["/assignment/"+assignmentDrag.id]);
  }

  onSaveAllData(){
    //boucle de data
    //sauvegarder les datas pour chaques itération
    this.assignmentsData.forEach((value)=> {
      this.assignmentsService.addAssignment(value)
        .subscribe(reponse => {
          console.log(reponse.message);
        });
    });
  }

  OnFirstPage(){
    this.page = 1;
    this.onLoadData(this.page,this.limit);
  }

  OnLastPage(){
    this.page = this.totalPages;
    this.onLoadData(this.page,this.limit);
  }

}
