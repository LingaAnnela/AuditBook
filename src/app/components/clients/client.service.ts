import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
// import {FirebaseListObservable} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Client} from './client.model';
import {Transaction} from '../audit/transaction/transaction.model';
import {AuditService} from '../audit/audit.service';
import {error} from 'util';
import {Subscription} from 'rxjs';

@Injectable()
export class ClientService {

  clientsCollection: AngularFirestoreCollection<Client>;
  transactionsCollection: AngularFirestoreCollection<Transaction>;
  clientDoc: AngularFirestoreDocument<Client>;
  transactionDoc : AngularFirestoreDocument<Transaction>;
  clients: Observable<Client[]>;
  // clientsPromise: Promise<Client[]>;
  client: Observable<Client>;
  // clientPromise: Promise<Client>;
  transactions: Observable<Transaction[]>;
  // transactionsPromise: Promise<Transaction[]>;
  transaction: Observable<Transaction>;
  // transactionPromise: Promise<Transaction>;

  constructor(private afs: AngularFirestore, private auditService: AuditService){
    this.clientsCollection = this.afs.collection('Clients', ref => ref.orderBy('lastName', 'asc'));
    this.transactionsCollection = this.afs.collection('Transactions');
  }

  getClients(): Observable<Client[]>{
    // this.clients.slice();
    this.clients = this.clientsCollection.snapshotChanges()
      .map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Client;
          data.id = action.payload.doc.id;
          return data;
        });
      });
    return this.clients;
  }

  getClient(id: string): Observable<Client>{
    this.clientDoc = this.afs.doc<Client>(`Clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().map(action => {
      if(action.payload.exists === false){
        return null;
      } else {
        const data = action.payload.data() as Client;
        data.id = action.payload.id;
        return data;
      }
    });
    return this.client;
  }

  addClient(value){
    this.clientsCollection.add(value);
    // Get the ID and pass on to Audit...
    this.auditService.newClient(value);
  }

  updateClient(id, value){
    this.clientDoc = this.afs.doc(`Clients/${id}`);
    this.clientDoc.update(value);
    this.auditService.auditInfo('update' , value);
  }

  deleteClient(id){
    this.clientDoc = this.afs.doc(`Clients/${id}`);
    this.auditService.auditDeleteInfo('delete' , id);
    this.clientDoc.delete();
  }

  getTransactions(clientId){
    // this.clients.slice();
    this.clientDoc = this.afs.doc<Client>(`Clients/${clientId}`);
    this.transactionsCollection = this.clientDoc.collection('Transactions');
    this.transactions = this.transactionsCollection.snapshotChanges()
      .map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Transaction;
          data.id = action.payload.doc.id;
          return data;
        });
      });
    return this.transactions;
  }

  getTransaction(clientId, transId){

    this.clientDoc = this.afs.doc<Client>(`Clients/${clientId}`);
    this.transaction = this.clientDoc.collection('Transactions').doc<Transaction>(`${transId}`).snapshotChanges()
      .map(action => {
      if(action.payload.exists === false){
        return null;
      } else {
        const data = action.payload.data() as Transaction;
        data.id = action.payload.id;
        return data;
      }
    });
    return this.transaction;

  }

  addTransaction(value) {
    var addTranx = value;
    addTranx.payments = [{
      amount: value.amount,
      date : value.date
    }];
    this.clientsCollection.doc(value.id).collection(`Transactions`).add(addTranx);

  }

  updateTransaction(clientId, transId, value){
    this.clientDoc = this.afs.doc<Client>(`Clients/${clientId}`);
    this.transactionDoc = this.clientDoc.collection('Transactions').doc<Transaction>(`${transId}`);
    this.transactionDoc.set(value).then(function() {
      // this.transactionDoc.set(Object.assign({}, value)).then(function() {
        console.log("Document successfully updated!");
      });
    };


    // this.getTransaction(clientId, transId).subscribe(tranx => {
    //   this.clientDoc = this.afs.doc<Client>(`Clients/${clientId}`);
    //   this.transactionDoc = this.clientDoc.collection('Transactions').doc<Transaction>(`${transId}`);
    //
    //     this.transactionDoc.set({
    //       name: value.amount,
    //       date: startDate,
    //       interest: interest,
    //       // payments: payments,
    //       amount: value.amount,
    //       notification: startDate
    //     }).then(function () {
    //       console.log('Record a payment! ::: unsubscribe');
    //
    //       this.transactionDoc.collection('Payments').add({
    //         amount : value.amount,
    //         date : value.date
    //       }).then(function() {
    //         console.log("Payment has been posted!");
    //       }).catch(function(error) {
    //         console.error("Error in posting a payment: ", error);
    //       });
    //     }).catch(function () {
    //       console.log('Payment has been failed.' + error);
    //     });
    //
    //   });


  // }

}
