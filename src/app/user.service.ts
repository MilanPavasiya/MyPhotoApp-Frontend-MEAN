import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {

  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService) {

    this.user = firebaseAuth.authState;

    console.log("User Id Token at the construction of the services", localStorage.getItem('userIdToken'))

    this.user.subscribe(
      userInfo => {
        console.log("User info is available", userInfo);
        this.saveIdToken(userInfo);
      }
    );
  }

  // CanActivate(): boolean 

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.firebaseAuth.auth.currentUser != null) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

  saveIdToken(firebaseUser: firebase.User) {
    firebaseUser.getIdToken().then(
      idTokenValue => {
        localStorage.setItem('userIdToken', idTokenValue);
        console.log("Id Token Value", localStorage.getItem('userIdToken'));

      }
    );
  }

  signup(email: string, password: string, name: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success signup!', value);
        this.saveIdToken(value.user);
        this.registerUser(email, name);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.messageService.newMessage(err.message);
      });
  }

  registerUser(email: string, name: string) {
    var user: User = {
      id: "",
      name: name,
      email: email,
      profilePhotoUrl: "https://www.freeiconspng.com/thumbs/profile-icon-png/account-profile-user-icon--icon-search-engine-10.png",
    };

    this.http.post(environment.apiBaseUrl + "user/register", user)
      .subscribe(response => {
        console.log('Success registration!');
        this.router.navigate(['albums/recent']);
      })
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.saveIdToken(value.user);
        this.router.navigate(['albums/recent']);
      })
      .catch(err => {
        console.log('Something went wrong:',);
        this.messageService.newMessage(err.message);
      });
  }

  logout() {
    localStorage.clear();
    this.firebaseAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  getCurrentUserProfile() {
    var headers = this.getHeaders();
    return this.http.get(environment.apiBaseUrl + "user/current", { headers });
  }

  getHeaders() {
    var headers = {
      'idToken': localStorage.getItem('userIdToken')
    }
    return headers;
  }
}