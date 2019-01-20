import {Component, EventEmitter, Input, OnInit, Output, Inject, ViewEncapsulation, OnDestroy} from '@angular/core';
import {Transaction} from '../../../audit/transaction/transaction.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ClientService} from '../../client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css'],
  encapsulation: ViewEncapsulation.Emulated //None, Emulated, Native
                        //None --> Styling will be used application wide
                        //Emulated --> Default --> Styling will be used for that component.
                        //Native --> Will be same as None but will be supported in the browser which supports shadow dom technology.
})
export class TransactionDetailsComponent implements OnInit, OnDestroy {

  @Input('tranDetails') transaction: Transaction;
  @Output('transUpdated') transactionUpdated = new EventEmitter<{ id: string, amount: string, date: string }>();
  // @Output('transUpdated') transactionUpdated  = new EventEmitter<Transaction>();

  // isPaymentSubmitted: boolean = false;
  private subscription: Subscription;
  panelOpenState = false;
  historyPanelOpenState = false;
  clientId: string;
  tranx: Transaction;
  updatedTranx: Transaction;
  transactionForm: FormGroup;

  constructor(public clientService: ClientService,
              private router: Router,
              private route: ActivatedRoute,
              public snackBar: MatSnackBar) {
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngOnInit() {

    this.transactionForm = new FormGroup({
      id: new FormControl(''),
      amount: new FormControl('', {validators: [Validators.required]}),
      date: new FormControl('', {validators: [Validators.required]})
    });

    this.clientId = this.route.snapshot.params['id'];

    this.clientService.getTransaction(this.clientId, this.transaction.id).subscribe(tranx => {
      this.tranx = tranx;
      console.log('this.tranx ::: '+this.tranx);


      });

  }

  ngOnDestroy(){
    if(this.subscription != undefined ){
      this.subscription.unsubscribe();
    }

  }

  calculateTransx(value, trx){

    trx = this.calculateInterest(value, trx);

    let currentAmount = parseInt(trx.amount);
    let currentInterest = parseInt(trx.interestEarned);
    let currentTotal = currentAmount + currentInterest;

    trx.amount = currentTotal - value.amount;
    console.log(value + ':' + trx);

    return trx;
  }

  calculateInterest(value, trans){

      let totalAmount;
      let interestEarned;
      let principal = trans.amount;
      let interestRate = trans.interest;
      let compoundRate = 1;

      var startDate = new Date(trans.date.seconds*1000);
      var dtCur = new Date(value.date);
      var effectiveYear;

      // var dtCur = new Date();

      var monthDiff = dtCur.getMonth()-startDate.getMonth();
      var yearDiff = dtCur.getFullYear()-startDate.getFullYear();
      effectiveYear = ((yearDiff * 12 + monthDiff) / 12).toFixed(2);

      // The equation is A = p * [[1 + (r/n)] ^ nt]
      totalAmount = principal* Math.pow((1 + (interestRate/(compoundRate*100))), (compoundRate*effectiveYear));
      interestEarned = (totalAmount - principal).toFixed();
      trans.interestEarned = interestEarned;
      trans.date = dtCur;

    return trans;

  }

  onSubmit(event) {
    this.panelOpenState = false;
    console.log(this.transactionForm.value, this.transactionForm.valid);
    // this.firstName = "";
    if (this.transactionForm.valid) {
      console.log(this.transactionForm);
    }
    this.clientId = this.route.snapshot.params['id'];

    var startDate;
    var payments;
    var interest;

    this.subscription = this.clientService.getTransaction(this.clientId, this.transaction.id).subscribe(tranx => {

      console.log('tranx ::: '+tranx);
        this.updatedTranx = tranx;
        let time = tranx.date;
        // startDate = new Date(time.seconds * 1000);
        payments = tranx.payments;
        interest = tranx.interest;

      if( this.transactionForm.value.date < startDate ){
        this.openSnackBar('The payment is not valid','UNDO');
        return true;
      }

        //update the payment.
      this.updatedTranx = this.calculateTransx(this.transactionForm.value, this.updatedTranx);

      payments.unshift({
        amount: this.transactionForm.value.amount,
        date: this.transactionForm.value.date
      });

      this.updatedTranx.payments = payments;
      this.updatedTranx.interest = interest;
      // this.updatedTranx.amount = this.transactionForm.value.amount;
      // this.updatedTranx.date = new Date();

      this.clientService.updateTransaction(this.clientId, this.transaction.id, this.updatedTranx);
      // Using emit to @input @output to get the data.
      // this.onUpdateTransaction();
      this.openSnackBar('Payment posted','UNDO');

    });

  }

  cancelPayment(){
    this.panelOpenState = false;
    console.log('Payment has been cancelled.');

  }

  onUpdateTransaction() {
    this.transactionUpdated.emit({
      id: this.transaction.id,
      amount: this.transactionForm.value.amount,
      date: this.transactionForm.value.date
    });
    // this.showPaymentExpansionPanel = false;
  }



}




