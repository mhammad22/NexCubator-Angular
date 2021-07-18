export class ChatPaneUserData {
  name: string;
  email: string;
  date: string;
  last_text: string;

  constructor(
    name?: string,
    email?: string,
    date?: string,
    last_text?: string
  ) {
    this.name = '';
    this.email = '';
    this.date = '';
    this.last_text = '';
  }
}
