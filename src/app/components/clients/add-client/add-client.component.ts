import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Client} from '../client.model';
import {FirebaseService} from '../../../services/firebase.service';
import {log} from 'util';
import {ClientService} from '../client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  loginForm: FormGroup;
  clients: Client[] = [] ;

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      firstName: new FormControl('', { validators: [Validators.required] }),
      lastName: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      phoneNo: new FormControl('', { validators: [Validators.required] }),
      transactions: new FormControl('')
    });
  }

  onSubmit() {
    console.log(this.loginForm.value, this.loginForm.valid);
    // this.firstName = "";
    if(this.loginForm.valid) {
      this.clientService.addClient(this.loginForm.value);
      this.router.navigate(['/clients']);
    }
      // .subscribe(
      //   (response) => console.log(response),
      //   (error) => console.log(error)
      // );
  }

}
