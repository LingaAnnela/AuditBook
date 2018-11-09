import {Component, Input, OnInit} from '@angular/core';
import {ClientService} from '../client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../client.model';
import {Transaction} from '../../audit/transaction/transaction.model';
import {log} from 'util';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  @Input() transactions;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
      console.log('client details : '+this.client);
    });
    this.clientService.getTransactions(this.id).subscribe(trans => {
      this.transactions =  trans;
      console.log('Transaction details: '+this.transactions);

      this.transactions = this.calculateInterest(this.transactions);
      this.calculateTotal(this.transactions);
    });

  }
  onTransUpdated(transData: {id: string, amount: string, date: string}){
    console.log('transData: '+ transData.id);
    console.log('transData: '+ transData.amount);
    console.log('transData: '+ transData.date);
  }

  calculateInterest(trans){

    trans.forEach(function(tran){
      let totalAmount = 0;
      var interestEarned ;
      let principal = tran.amount;
      let interestRate = tran.interest;
      let time = tran.duration;
      let compoundRate = 1;

      // var startDate = timeConverter(tran.date);
      var startDate = new Date(tran.date.seconds*1000);
      // var startDate = new Date(tran.date*1000).toLocaleDateString("en-US");
      // startDate = startDate.setTime(tran.date*1000).toLocaleString();
      var effectiveYear;
      var dtCur = new Date();

      // var dayDiff = dtCur.getDate()-startDate.getDate();
      var monthDiff = dtCur.getMonth()-startDate.getMonth();
      var yearDiff = dtCur.getFullYear()-startDate.getFullYear();
      effectiveYear = ((yearDiff * 12 + monthDiff) / 12).toFixed(2);

      // The equation is A = p * [[1 + (r/n)] ^ nt]
      totalAmount = principal* Math.pow((1 + (interestRate/(compoundRate*100))), (compoundRate*effectiveYear));
      interestEarned = (totalAmount - principal).toFixed();
      tran.interestEarned = interestEarned;
      console.log('tran interestEarned : '+interestEarned);
    });
    return trans;

  }

  calculateTotal(trans){
    var totalPrincipal= 0;
    var totalInterest= 0;
    var totalAmount= 0;

    trans.forEach(function (tran){
      totalPrincipal += parseInt(tran.amount);
      totalInterest  += parseInt(tran.interestEarned);

    });
    totalAmount = totalPrincipal + totalInterest;
    console.log('totalAmount : '+ totalAmount);
    trans.totalPrincipal = totalPrincipal;
    trans.totalInterest = totalInterest;
    trans.totalAmount = totalAmount;

    // return trans;
  }

}
