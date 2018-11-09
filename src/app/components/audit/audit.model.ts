
export class AuditModel {
  public type: string;
  public clientId: string;
  public clientName: string;
  public oldValue?: string;
  public newValue?: string;
  public date: Date;
  public transactionId?: string;

  constructor(type: string,
              id: string,
              name: string,
              oldVal: string,
              newVal: string,
              date: Date,
              transId: string) {
    this.type = type;
    this.clientId = id;
    this.clientName = name;
    this.oldValue = oldVal;
    this.newValue = newVal;
    this.date = date;
    this.transactionId = transId;

  }
}
