export class RegisterBindingModel {
  Email: string;
  Name: string;
  UserRoles: string;
  Gender: string;
  Password: string;
  ConfirmPassword: string;

  constructor(
    Email: string,
    Name: string,
    UserRoles: string,
    Gender: string,
    Password: string,
    ConfirmPassword: string
  ) {
    this.ConfirmPassword = ConfirmPassword;
    this.Email = Email;
    this.Gender = Gender;
    this.Name = Name;
    this.Password = Password;
    this.UserRoles = UserRoles;
  }
}
