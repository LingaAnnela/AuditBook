import { Component, OnInit } from '@angular/core';
import { AuditService } from '../audit/audit.service';
import {AuditModel} from '../audit/audit.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  audit: AuditModel;
  audits: AuditModel[];

  constructor(private auditService: AuditService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.auditService.getAudits().subscribe(audits => {
      this.audits = audits;
      console.log(this.audits);
    } );
  }

}
