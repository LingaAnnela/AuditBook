import { Component, OnInit } from '@angular/core';
import {Client} from './client.model';
import {ClientService} from './client.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  client: Client;
  clients: Client[];

  constructor(private clientService: ClientService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      console.log(this.clients);
    } );
  }

  onDeleteClick(id) {
    if (confirm('Are you sure want to delete?')) {
      // we have to get the id here
      this.clientService.deleteClient(id);
      // event.preventDefault();
      this.router.navigate(['/clients/']);
    }

  }

}
