/**
 * Created by silver_android on 03/12/16.
 */
export class JSONResponseModel {
  constructor(private _err: any, private _data: any) {
  }

  get err(): any {
    return this._err;
  }

  get data(): any {
    return this._data;
  }
}
