import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ChatPaneUserData } from '../Models/ChatPaneUserData';
import { Message } from '../Models/Message';
import { ChatdashboardService } from './chatdashboard.service';

@Component({
  selector: 'app-chatdashboard',
  templateUrl: './chatdashboard.component.html',
  styleUrls: ['./chatdashboard.component.css'],
})
export class ChatdashboardComponent implements OnInit {
  txtMessage: string = '';
  senderid: string = '';
  receiverid: string = '';
  // uniqueID: string = new Date().getTime().toString();
  messages = new Array<Message>();
  message = new Message();

  receivedmsg = new Message();
  chat_users = new Array<ChatPaneUserData>();
  current_active: string = '';

  selectedItem = 0;

  constructor(
    private chatService: ChatdashboardService,
    private _ngZone: NgZone,
    private cd: ChangeDetectorRef
  ) {
    this.loadChatUsers();
    this.subscribeToReceivedMessage();
  }

  sendMessage(): void {
    this.senderid = localStorage.getItem('LoggedInUserEmail') || '{}';
    console.log('ID S-R: ' + this.senderid + ' - ' + this.receiverid);

    if (this.senderid) {
      if (this.chatService.connectionIsEstablished == false) {
        this.chatService.initializeSignalRConnection(this.senderid);
      }
      if (this.txtMessage) {
        this.message = new Message();
        this.message.clientuniqueid = this.senderid;
        this.message.receiverid = this.receiverid;
        this.message.type = 'sent';
        this.message.message = this.txtMessage.trim();
        this.message.date = new Date().toString().split(' GMT')[0];

        this.messages.push(this.message);
        this.chatService.sendMessage(this.message);
        $('#history').animate(
          { scrollTop: $('#history').prop('scrollHeight') },
          1000
        );
        document.getElementById(
          this.receiverid
        ).innerHTML = this.message.message;
        this.txtMessage = '';
        //This does not update the highlighted row
        this.loadChatUsers();
        this.selectedItem = 0;
      }
    }
  }

  //Load info of users the current user is chatting with
  private loadChatUsers(): void {
    this.chat_users = [];
    this.chatService.getChatUsers().subscribe((data: ChatPaneUserData[]) => {
      this._ngZone.run(() => {
        for (var i = 0; i < data.length; i++) {
          this.chat_users.push(data[i]);
        }
        console.log('Inside ngZone loadChatUsers: ');
        console.log(this.chat_users);
        this.cd.detectChanges();
      });
    });
  }

  ngOnDestroy(): void {
    this.chatService.stopServerConnection();
  }

  //Listener for listening to arriving messages to user
  private subscribeToReceivedMessage(): void {
    this.chatService.messageReceived.subscribe((message: Message) => {
      console.log('Inside received message...');
      this._ngZone.run(() => {
        if (message.clientuniqueid !== this.senderid) {
          message.type = 'received';

          this.receivedmsg.clientuniqueid = message.receiverid;
          this.receivedmsg.receiverid = message.clientuniqueid;
          this.receivedmsg.date = new Date().toString().split(' GMT')[0];
          this.receivedmsg.type = message.type;
          this.receivedmsg.message = message.message;

          //Store duplicate msg with different sender and receiver
          this.chatService
            .addReceivedMessage(this.receivedmsg)
            .subscribe((data: any) => {});

          //this.db.updateMessageStatus(message).subscribe((data:any)=>{});
          this.messages.push(message);
          document.getElementById(
            this.receiverid
          ).innerHTML = this.receivedmsg.message;
          $('#history').animate(
            { scrollTop: $('#history').prop('scrollHeight') },
            1000
          );
          this.cd.detectChanges();
        }
      });
    });
  }

  Login(): void {
    // this.db.Login().subscribe((data: any) => {
    //   console.log(data);
    //   //this.messages.push(data);
    // });
  }

  //Get message history of user with recepient from database
  newMessage(email: string): void {
    this.senderid = localStorage.getItem('LoggedInUserEmail') || '{}';
    console.log('ID S-R: ' + this.senderid + ' - ' + this.receiverid);

    if (this.chatService.connectionIsEstablished == false) {
      this.chatService.initializeSignalRConnection(this.senderid);
    }

    this.receiverid = email;
    this.chatService.getMessage(email).subscribe((data: Message[]) => {
      //console.log('Messages received: ' + data),
      this._ngZone.run(() => {
        this.current_active = this.chat_users.find(
          (t) => t.email == email
        )?.name!;
        this.messages.length = 0;
        for (var i = 0; i < data.length; i++) {
          this.messages.push(data[i]);
        }
        console.log('Inside ngZone NewMessage: ');
        console.log(this.messages);
        // $("#history").animate({ scrollTop: $('#history').prop("scrollHeight")}, 1000);
        var objDiv = document.getElementById('history');
        objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight;
        this.cd.detectChanges();
      });
      //this.cd.detectChanges();
    });
  }
  ngOnInit(): void {}
}
