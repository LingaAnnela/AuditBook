import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    return this.afAuth.authState.map(auth => {
      if(!auth){
        this.router.navigate(['/auth/login']);
        return false;
      }else {
        return true;
      }
    });
    // if(this.authService.isAuth()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/auth/login']);
    // }
  }

}
