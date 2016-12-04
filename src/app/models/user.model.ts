/**
 * Created by silver_android on 27/11/16.
 */
export class User {

  constructor(private _username: string, private _password: string, private _role: string, private _name?: string, private _email?: string) {}

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }

  get role(): string {
    return this._role;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }
}
