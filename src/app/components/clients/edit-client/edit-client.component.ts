import { Component, OnInit } from '@angular/core';
import {ClientService} from '../client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../client.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Transaction} from '../../audit/transaction/transaction.model';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  editForm: FormGroup;
  id: string;
  client: Client;
  //   = {
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phoneNo: ''
  // };

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.editForm = new FormGroup({
      firstName: new FormControl('', { validators: [Validators.required] }),
      lastName: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      phoneNo: new FormControl('', { validators: [Validators.required] })
    });

    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
      console.log('this client: ' + this.client);
    });
  }

  onSubmit(){
    console.log(this.editForm.value, this.editForm.valid);
    // this.firstName = "";
    if(this.editForm.valid){
      this.clientService.updateClient(this.id, this.editForm.value);
      this.router.navigate(['/clients/client/' + this.id]);
    }
  }


}
