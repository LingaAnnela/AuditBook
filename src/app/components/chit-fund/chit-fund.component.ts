import { Component, OnInit } from '@angular/core';
import {ChitFundService} from './chit-fund.service';

@Component({
  selector: 'app-chit-fund',
  templateUrl: './chit-fund.component.html',
  styleUrls: ['./chit-fund.component.css']
})
export class ChitFundComponent implements OnInit {

  constructor(private chitfundService : ChitFundService) { }

  ngOnInit() {
    console.log('ChitFundService ::: '+this.chitfundService.valueOf());
  }

}
