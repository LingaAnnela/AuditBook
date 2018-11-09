import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})


export class SidenavComponent implements OnInit, OnDestroy {

  @Output() closeSidenav = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // });
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.isAuth = true;
      }else{
        this.isAuth = false;
      }

    });
  }

  onLogout(){
    this.onClose();
    this.authService.logout();
  }

  onClose(){
    this.closeSidenav.emit();
  }
  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

}
