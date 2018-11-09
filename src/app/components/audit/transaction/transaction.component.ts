import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../clients/client.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Client} from '../../clients/client.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactionForm: FormGroup;
  clients: Client[] = [] ;
  // maxDate;

  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    //
    // this.maxDate = new Date();
    // this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    // [max]="maxDate" --> add this to the date picker in the input

    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      console.log(this.clients);
    } );
    this.transactionForm = new FormGroup({
      id: new FormControl(''),
      amount: new FormControl('', { validators: [Validators.required] }),
      date: new FormControl('', { validators: [Validators.required] }),
      interest: new FormControl('', { validators: [Validators.required] }),
      notification: new FormControl('', { validators: [Validators.required] }),
      interval: new FormControl(''),
      duration: new FormControl(''),
      attachments: new FormControl('')
    });
  }

  onSubmit() {
    console.log(this.transactionForm.value, this.transactionForm.valid);
    // this.firstName = "";

    if(this.transactionForm.valid){
      this.clientService.addTransaction(this.transactionForm.value);
      this.router.navigate(['/clients']);
    }
    // .subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // );
  }

}
