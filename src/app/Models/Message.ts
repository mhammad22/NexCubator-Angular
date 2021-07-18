export class Message {
  clientuniqueid: string;
  type: string;
  message: string;
  date: string;
  receiverid: string;

  constructor(
    clientuniqueid?: string,
    type?: string,
    message?: string,
    date?: string,
    receiverid?: string
  ) {
    this.clientuniqueid = '';
    this.type = '';
    this.message = '';
    this.date = '';
    this.receiverid = '';
  }
}
