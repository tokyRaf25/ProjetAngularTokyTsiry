import { AuthService } from 'src/app/shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Matier } from '../matier.model';
import { MatiersService } from 'src/app/shared/matiers.service';

@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css']
})
export class EditAssigmentComponent implements OnInit {
  assignment:Assignment;

  // pour le formulaire
  matieres:Matier[];
  nom = "";
  dateDeRendu = null;
  matiere = null;
  note = null;
  remarque = '';

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
     private matiersService:MatiersService
  ) {}

  ngOnInit(): void {
    this.authService.getSession();
    this.onLoadMatiere();
    // ici on montre comment on peut récupérer les parametres http
    // par ex de :
    // http://localhost:4200/assignment/1/edit?nom=Michel%20Buffa&metier=Professeur&responsable=MIAGE#edition

    //console.log(this.route.snapshot.queryParams);
    //console.log(this.route.snapshot.fragment);

    this.getAssignmentById();
  }

  onLoadMatiere() {
    this.matiersService.getMatieres()
    .subscribe(data => {
      console.log(data);
      this.matieres = data;
    });

  }

  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;

      this.nom = assignment.nomEleve;
      this.dateDeRendu = assignment.dateDeRendu;
      this.note = assignment.note;
      this.matiere = assignment.idMatiere;
      this.remarque = assignment.remarques;
    });
  }


  onSubmit(event) {
    // on va modifier l'assignment
    if((!this.nom) || (!this.dateDeRendu)) return;

    this.assignment.nomEleve = this.nom;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.note = this.note;
    this.assignment.idMatiere = this.matiere;
    this.assignment.remarques = this.remarque;

    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);

        // et on navigue vers la page d'accueil
        this.router.navigate(["/home"]);
      })

  }
}
