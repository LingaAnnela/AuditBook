import { Subject } from 'rxjs/Subject';
import {AuthData} from './auth-data.model';
import {User} from './user.model';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';

// this will be user to inject a service into another service
@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router){

  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
    this.router.navigate(['']);
  }

  login(authData: AuthData){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(userData => resolve(userData),
          err => reject(err))
    });
  }

  getAuth(){
    return this.afAuth.authState.map(auth => auth);
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  // login(authData: AuthData){
  //   this.user = {
  //     email: authData.email,
  //     userId: Math.round(Math.random() * 10000).toString()
  //   };
  //   this.authChange.next(true);
  //   console.log('login');
  //   this.router.navigate(['']);
  //
  // }

  // logout(){
  //   this.user = null;
  //   this.authChange.next(false);
  //   this.router.navigate(['/auth/login']);
  // }

  getUser(){
    return {...this.user};
  }

  isAuth(){
    return this.user != null;
  }

}
