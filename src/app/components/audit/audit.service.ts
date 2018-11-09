import {Injectable} from '@angular/core';
import { AuditModel } from './audit.model';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuditService {

  auditCollection: AngularFirestoreCollection<AuditModel>;
  audits: Observable<AuditModel[]>;
  audit: Observable<AuditModel>;
  // auditLog2: AuditModel;
  auditLog2: AuditModel = {
    type: '',
    clientId: '',
    clientName: '',
    oldValue:'',
    newValue:'',
    date: new Date(),
    transactionId: ''
  };

  constructor(private afs: AngularFirestore){
    this.auditCollection = this.afs.collection('Audits', ref => ref.orderBy('date', 'desc'));
  }

  ngOnInit(){ }

  getAudits(): Observable<AuditModel[]>{
    // this.clients.slice();
    this.audits = this.auditCollection.snapshotChanges()
      .map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as AuditModel;
          data.clientId = action.payload.doc.id;
          return data;
        });
      });
    return this.audits;
  }

  newClient(value){
    // this.auditLog2 = new AuditModel(value.firstName , value.firstName, value.firstName, value.firstName , value.firstName, value.firstName)
    this.auditLog2.clientId = value.firstName;
    this.auditLog2.clientName = value.firstName;
    this.auditLog2.date = new Date();
    this.auditLog2.newValue = value.firstName;
    this.auditLog2.oldValue = value.firstName;
    this.auditLog2.transactionId = value.lastName;
    this.auditCollection.add(this.auditLog2);
    console.log('New user has been added' +this.auditLog2);
  }

  auditInfo(type, value){
    this.auditLog2.type = type;
    this.auditLog2.clientId = value.firstName;
    this.auditLog2.clientName = value.firstName;
    this.auditLog2.date = new Date();
    this.auditLog2.newValue = value.firstName;
    this.auditLog2.oldValue = value.firstName;
    this.auditLog2.transactionId = value.lastName;
    this.auditCollection.add(this.auditLog2);
    console.log('User has been updated..!' +this.auditLog2);
  }

  auditDeleteInfo(type, id){
    this.auditLog2.type = type;
    this.auditLog2.clientId = id;
    // this.auditLog2.clientName = value.firstName;
    this.auditLog2.date = new Date();
    this.auditCollection.add(this.auditLog2);
    console.log('Client had been deleted. with ID: ' +id);

  }

}
