import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChitFundService {

  constructor(private afs: AngularFirestore) { }
}
