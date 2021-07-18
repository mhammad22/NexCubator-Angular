import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Message } from '../Models/Message';

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class ChatdashboardService {
  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();

  connectionIsEstablished = false;
  private connection: any;
  private proxy: any;

  messageHistory = new EventEmitter<Message>();

  constructor(private http: HttpClient) {
    //this.initializeSignalRConnection();
  }

  stopServerConnection() {
    // this.connection.stop();
    var myHubProxy = $.connection.myHub;
    $.connection.hub.stop();
    this.connectionIsEstablished = false;
  }

  getChatUsers(): Observable<any> {
    // let tokenInfo = JSON.parse(localStorage.getItem('TokenInfo') || '{}');

    // let tokenInfo = localStorage.getItem('TokenInfo');
    //console.log('Getting message users for:' + tokenInfo);

    return this.http
      .get('http://localhost:52497/api/Message/GetChatHistoryUsers')
      .pipe(tap((data) => console.log(data)));
  }

  addReceivedMessage(message: Message): Observable<any> {
    // let tokenInfo = JSON.parse(localStorage.getItem('TokenInfo') || '{}');
    //let tokenInfo = localStorage.getItem('TokenInfo');
    //console.log('Token:' + tokenInfo.access_token);
    console.log('Inside posting message.');
    return this.http
      .post('http://localhost:52497/api/Message/PostMessage', message)
      .pipe(tap((data) => console.log(data)));
  }

  updateMessageStatus(message: Message): Observable<any> {
    //let tokenInfo = JSON.parse(localStorage.getItem('TokenInfo') || '{}');
    //console.log('Token:' + tokenInfo.access_token);
    return this.http
      .put('http://localhost:52497/api/Message/UpdateMessage', message)
      .pipe(tap((data) => console.log(data)));
  }

  getMessage(receiverid: string): Observable<any> {
    //let tokenInfo = JSON.parse(localStorage.getItem('TokenInfo') || '{}');
    //console.log('Token:' + tokenInfo.access_token);
    var s = receiverid.replace('@', '!');
    var t = s.replace('.', '_');
    //console.log(t);
    return (
      this.http
        .get('http://localhost:52497/api/Message/GetMessages/' + t)
        //.subscribe((data:any)=>{this.messageHistory.emit(data);})
        .pipe(
          tap((data: any) => {
            this.messageHistory.emit(data);
          })
        )
    );
  }

  // Login(email:string, password:string): Observable<any> {
  //   console.log('Inside service');
  //   return this.http
  //     .post(
  //       'http://localhost:52497/token',
  //       'userName='+ email +
  //         '&password=' +
  //         password +'&grant_type=password',
  //       { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  //       // {headers: new HttpHeaders()
  //       //   .set('Access-Control-Allow-Origin', '*')
  //       //   .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  //       //   .set('Content-Type', 'application/x-www-form-urlencoded ; charset-ISO-8859-1')
  //       //   .set('Access-Control-Allow-Credential', 'true'),}
  //     )
  //     .pipe(
  //       tap((data) => {
  //         //console.log(data);
  //         localStorage.setItem('TokenInfo', JSON.stringify(data));
  //         localStorage.setItem('LoggedUser', email);
  //       })
  //     );
  // }

  //Courses Service End

  // Chathub Service Start

  sendMessage(message: Message) {
    console.log('Inside invoke');
    if (this.proxy == null) {
      console.log('Numm proxy!');
    }
    this.proxy.invoke('SendMessage', message).catch((err: any) => {
      console.log(err);
    });
  }

  public initializeSignalRConnection(senderid: string): void {
    let signalRServerEndPoint = 'http://localhost:52497';
    this.connection = $.hubConnection(signalRServerEndPoint);
    this.connection.qs = 'name=' + senderid;
    this.proxy = this.connection.createHubProxy('ChatHub');

    this.proxy.on('SendMessage', (data: any) => {
      this.messageReceived.emit(data);
      console.log('received: ' + data);
    });
    this.connection.logging = true;
    this.connection
      .start({ transport: ['longPolling'] }, 5000)
      .done((data: any) => {
        this.connectionIsEstablished = true;
        this.connectionEstablished.emit(true);
        console.log(
          'Connected to Notification Hub' +
            ' Connection ID: ' +
            this.connection.id
        );
        //this.broadcastMessage();
      })
      .catch((error: any) => {
        console.log('Notification Hub error -> ' + error);
      });
  }
  // private broadcastMessage(): void {
  //   this.proxy
  //     .invoke('NotificationService', 'text message')
  //     .catch((error: any) => {
  //       console.log('broadcastMessage error -> ' + error);
  //     });
  // }

  // private onMessageReceived(serverMessage: string) {
  //   console.log('New message received from Server: ' + serverMessage);
  // }
}
