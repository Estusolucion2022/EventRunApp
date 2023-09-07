import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user.model';
import { Credentials } from '../interfaces/credentials.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../constants';
import { OptionSelect } from '../interfaces/option-select.model';
import { ResponseApi } from '../interfaces/response-api.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _http = inject(HttpClient);

  private _user = new BehaviorSubject<User | null>(null);
  user$ = this._user.asObservable();

  SetUser(user: User | null) {
    this._user.next(user);
  }

  getUser(credentials: Credentials): Observable<ResponseApi> {
    let url = Constants.URL_API + Constants.ENDPOINT_GET_USER;
    return this._http.post<ResponseApi>(url, credentials);
  }

  sendEmail(user: string): Observable<ResponseApi> {
    let url = Constants.URL_API + Constants.ENDPOINT_SEND_EMAIL;
    return this._http.post<ResponseApi>(url + user, null);
  }

  updatePassword(user: string, password: string): Observable<ResponseApi> {
    const model = {
      userPlataform: user,
      password: password,
    };
    let url = Constants.URL_API + Constants.ENDPOINT_UPDATE_PASSWORD;
    return this._http.post<ResponseApi>(url, model);
  }

  getLocalUser$(): Observable<User | null> {
    return this.user$;
  }
}
