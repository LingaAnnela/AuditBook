import { Component } from '@angular/core';

@Component({
  selector: 'audit-dashboard',
  templateUrl: './audit-dashboard.component.html',
  styleUrls: ['./audit-dashboard.component.css']
})
export class AuditDashboardComponent {
  cards = [
    { title: 'Balance', cols: 2, rows: 1 , href:'/audit/balance' },
    { title: 'Credit', cols: 1, rows: 1 , href:'/audit/credit'},
    { title: 'Debit', cols: 1, rows: 1 , href:'/audit/debit'}
    // ,
    // { title: 'Balance', cols: 1, rows: 1 , href:'/audit/balance'}
  ];
}
