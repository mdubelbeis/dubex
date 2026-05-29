class User {
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  constructor(firstName: string, lastName: string, email: string) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
  }
  get email(): string {
    return this._email;
  }
  set email(email: string) {
    this._email = email;
  }
  get lastName(): string {
    return this._lastName;
  }
  set lastName(lastName: string) {
    this._lastName = lastName;
  }
  get firstName(): string {
    return this._firstName;
  }
  set firstName(firstName: string) {
    this._firstName = firstName;
  }
}
