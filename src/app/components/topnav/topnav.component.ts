import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
   @Output() sidenavToggle = new EventEmitter<void >();

  constructor() { }

  ngOnInit() {
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }

}
