
export class ChitFundModel {

  public cf_name: string;
  public cf_duration: number;
  public cf_mPayment: number;
  public cf_tAmount: number;
  public member_name: string;
  public member_phoneNo: string;
  public member_email: string;
  public organizer: string;
  public beneficiary: string;

  constructor(cf_name: string,
              cf_duration: number,
              cf_mPayment: number,
              cf_tAmount: number,
              member_name: string,
              member_phoneNo: string,
              member_email: string,
              organizer: string,
              beneficiary: string
              ) {
    this.cf_name = cf_name;
    this.cf_duration = cf_duration;
    this.cf_mPayment = cf_mPayment;
    this.cf_tAmount = cf_tAmount;
    this.member_name = member_name;
    this.member_phoneNo = member_phoneNo;
    this.member_email = member_email;
    this.organizer = organizer;
    this.beneficiary = beneficiary;

  }
}
