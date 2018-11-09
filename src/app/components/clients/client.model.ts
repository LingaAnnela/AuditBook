import {Transaction} from '../audit/transaction/transaction.model';

export class Client {
  public id?: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNo: string;
  public transaction: Transaction;
  // public status?: 'completed' | 'cancelled' | null ;

  constructor(id: string,
              fName: string,
              lName: string,
              email: string,
              phoneNo: string,
              transaction: Transaction) {
    this.id = id;
    this.firstName = fName;
    this.lastName = lName;
    this.email = email;
    this.phoneNo = phoneNo;
    this.transaction = transaction;
  }
}
