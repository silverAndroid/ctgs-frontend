/**
 * Created by silver_android on 01/12/16.
 */
export class ResponseModel {
  constructor(private _err: boolean, private _message: string) {
  }

  get err(): boolean {
    return this._err;
  }

  set err(value: boolean) {
    this._err = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}
