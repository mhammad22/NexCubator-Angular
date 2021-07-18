export class Password {
  OldPassword: string;
  NewPassword: string;
  ConfirmPassword: string;

  constructor(
    OldPassword: string,
    NewPassword: string,
    ConfirmPassword: string
  ) {
    this.ConfirmPassword = ConfirmPassword;
    this.NewPassword = NewPassword;
    this.OldPassword = OldPassword;
  }
}
