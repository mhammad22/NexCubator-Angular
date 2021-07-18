import { Password } from './../Models/Password';
import { Router } from '@angular/router';
import { SettingService } from './../services/setting.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentMethod } from '../Models/PaymentMethod';
import { data } from 'jquery';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  OldPassword: string;
  NewPassword: string;
  ConfirmPassword: string;

  isUserRoleCheck = false;
  StoreRole: string;

  Change_Password: Password;
  isSuccessful = false;
  isFailed = false;

  CardNum: string;
  ExpMonth: number;
  ExpYear: number;
  cvc: string;
  paymentid: number;

  newNum: string = '';

  existsFlag: boolean = false;

  constructor(
    private _SettingService: SettingService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._SettingService.GetUserRole().subscribe((data) => {
      this.StoreRole = data;

      if (this.StoreRole.localeCompare('Startup')) {
        this.isUserRoleCheck = true;
      }
      if (this.StoreRole.localeCompare('Investor')) {
        this.isUserRoleCheck = true;
      }
      if (this.StoreRole.localeCompare('Admin')) {
        this.isUserRoleCheck = false;
      }
    });

    this._SettingService.GetPaymentMethod().subscribe((data) => {
      // let arr: number[] = [3, 7, 11];

      if (data != '') {
        this.existsFlag = true;

        let temp: string = '';

        temp = data.CardNum.slice(0, 4);
        this.newNum = this.newNum + temp + ' ';

        temp = data.CardNum.slice(4, 8);
        this.newNum = this.newNum + temp + ' ';

        temp = data.CardNum.slice(8, 12);
        this.newNum = this.newNum + temp + ' ';

        temp = data.CardNum.slice(12, 16);
        this.newNum = this.newNum + temp;

        console.log('Updated Card Num: ', this.newNum);

        this.CardNum = data.CardNum;
        this.paymentid = data.Id;

        this.ExpMonth = data.ExpMonth;
        this.ExpYear = data.ExpYear;
        this.cvc = data.cvc;
      } else {
      }
    });
  }

  onClickSubmit() {
    this.Change_Password = new Password(
      this.OldPassword,
      this.NewPassword,
      this.ConfirmPassword
    );
    this._SettingService.ChangePassword(this.Change_Password).subscribe(
      (data) => {
        console.log('data from API = ' + data);
        this.isSuccessful = true;
        this.isFailed = false;
        this.toastr.show('Password Changed Successfully.');
      },
      (error) => {
        console.log(error);
        this.isFailed = true;
        this.toastr.show('Password Not Changed.');
      }
    );
  }

  onClickDelete() {
    this._SettingService.DeletePaymentMethod(this.paymentid).subscribe(
      (data) => {
        this.toastr.show('Payment Method Deleted Successfully');
        (<any>$('#deletepayment')).modal('hide');
      },
      (err) => {
        this.toastr.show('Payment Method Deletion Failed');
        (<any>$('#deletepayment')).modal('hide');
      }
    );
  }
}
