import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  admin = false;

  uri = "http://localhost:8010/api/utilisateur";

  constructor(private http:HttpClient,@Inject(LOCAL_STORAGE) private storage: StorageService) {}

  logIn(login, password):Observable<any> {
    // typiquement, acceptera en paramètres un login et un password
    // vérifier qu'ils sont ok, et si oui, positionner la propriété loggedIn à true
    // si login/password non valides, positionner à false;
    let user = {
      "identifiant" : login,
      "password" : password
    };
    return this.http.post(this.uri+"/check", user);
  }

  createSessionAdmin(){
    this.storage.set("connected",true);
    this.storage.set("admin",true);
    this.getSession();
  }

  destroySession(){
      this.storage.remove("connected");
      this.storage.remove("admin");
  }

  logOut() {
    console.log("service de connexion");
    this.loggedIn = false;
    this.admin = false;
    this.destroySession();
  }

  getSession(){
    this.loggedIn = this.storage.get("connected");
    this.admin = this.storage.get("admin");
  }

  // exemple d'utilisation :
  // isAdmin.then(admin => { console.log("administrateur : " + admin);})
  isAdmin() {
    return new Promise((resolve, reject) => {
      resolve(this.admin);
    });
  }
}
