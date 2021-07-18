
export class PaymentMethod {
  CardNum: string;
  ExpMonth: number;
  ExpYear: number;
  cvc: string;

  constructor(CardNum: string, ExpMonth: number, ExpYear: number, cvc: string) {
    this.CardNum = CardNum;
    this.ExpMonth = ExpMonth;
    this.ExpYear = ExpYear;
    this.cvc = cvc;
  }
}
