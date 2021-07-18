import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../Models/Message';
import { InvestorStartConvoService } from './investor-start-convo.service';

@Component({
  selector: 'app-investor-start-convo',
  templateUrl: './investor-start-convo.component.html',
  styleUrls: ['./investor-start-convo.component.css'],
})
export class InvestorStartConvoComponent implements OnInit {
  message: string;
  startupid: string;
  startupname: string;

  newMessage: Message;

  ProblemStatement: string;
  ProposedSolution: string;
  ValueProposition: string;
  MarketPlan: string;

  constructor(
    private router: Router,
    private convo: InvestorStartConvoService
  ) {}

  onClickSubmit() {
    console.log(this.message);

    let sender = localStorage.getItem('LoggedInUserEmail');
    console.log(sender);

    this.newMessage = new Message();
    this.newMessage.clientuniqueid = sender;
    this.newMessage.receiverid = this.startupid;
    this.newMessage.type = 'sent';
    this.newMessage.date = new Date().toString().split(' GMT')[0];
    this.newMessage.message = this.message;

    console.log('Newly created message: ', this.newMessage);
    this.convo.initateConvo(this.newMessage).subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.startupid = this.router.url.split('/')[3];
    console.log(this.startupid);

    this.convo.getPitch(this.startupid).subscribe((data) => {
      this.MarketPlan = data.MarketPlan;
      this.ProblemStatement = data.ProblemStatement;
      this.ValueProposition = data.ValueProposition;
      this.ProposedSolution = data.ProposedSolution;
      this.startupname = data.StartupName;
    });
  }
}
