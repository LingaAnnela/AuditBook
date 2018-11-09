import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class  FirebaseService {
  constructor(private http: Http){

  }
  saveClients(clients: any[]){
    return this.http.post('https://audit-book.firebaseio.com/clients.json', clients);
  }
}
