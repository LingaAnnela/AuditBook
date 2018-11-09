export class Transaction {
  public id?: string;
  public name: string;
  // public lastName: string;
  public amount: number;
  public date: Date;
  public interest?: number;
  public notification: boolean;
  public interval?: number;
  public duration?: string;
  public attachments?: string;
  public payments: any[];
  // public status?: 'completed' | 'cancelled' | null ;

  constructor(id: string,
              name: string,
              amount: number,
              date: Date,
              interest: number,
              notification: boolean,
              interval: number,
              duration: string,
              attachments: string,
              payments: any) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.date = date;
    this.interest = interest;
    this.notification = notification;
    this.interval = interval;
    this.duration = duration;
    this.attachments = attachments;
    this.payments = payments;
  }
}
